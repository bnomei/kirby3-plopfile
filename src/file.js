const Kirby = require('./helpers/kirby.js');
const Slugify = require('./helpers/slugify.js');
const F = require('./helpers/f.js');
const Path = require('path');
const FS = require('fs');

module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
        let filename = Path.basename(text);
        return filename.split('.').map(function (part) {
            return Slugify.parse(part);
        }).join('.');
    });
    plop.setHelper('trimTrailingSlash', function (text) {
        return text.replace(/\/$/, "");
    });
    plop.setHelper('toLowerCase', function (text) {
        return text.toLowerCase();
    });
    plop.setHelper('ucfirst', function (text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    });

    var basepath = Kirby.root('content');

    var prompts = [{
            type: 'input',
            name: 'file',
            message: 'Source File'
        },
        {
            type: 'input',
            name: 'parent',
            message: 'Enter UID of the parent folder',
            default: basepath + '/',
        },
        {
            type: 'input',
            name: 'template',
            message: 'Template',
            default: '',
        }
    ];

    const existingLanguages = Kirby.languages();
    if (existingLanguages.length) {
        prompts.push({
            type: 'list',
            name: 'language',
            message: 'Language',
            choices: existingLanguages,
        });
    }

    prompts.push({
        type: 'input',
        name: 'import',
        message: 'Import data from json string, json or yml file (optional)',
        default: '{}'
    });

    plop.setGenerator('file', {
        description: 'copy file to a content folder',
        prompts: prompts,
        actions: [
        function (data) {
            data['data'] = F.load(data['import']);
            return data['data'];
        },
        {
            type: 'add',
            path: basepath + '/{{trimTrailingSlash parent }}/{{saveFilename file }}{{#if language}}.{{ language }}{{/if}}.txt',
            templateFile: 'file.txt.hbs'
        },
        function (data) {
            let source = F.findFile(data['file']);
            let target = plop.renderString(basepath + '/{{trimTrailingSlash parent }}/{{saveFilename file }}', data);
            FS.copyFileSync(source, target);
            return source + ' -> ' + target;
        },
        function(data) {
            let path = plop.renderString(basepath + '/{{trimTrailingSlash parent }}/{{saveFilename file }}{{#if language}}.{{ language }}{{/if}}.txt', data);
            return F.clipboard(plop, path, '@PLOP_CURSOR');
        }]
    });
};

