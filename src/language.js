const Kirby = require('./helpers/kirby.js');
const fg = require('fast-glob');

module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
        return text.toLowerCase()
            .replace(' ', '');
    });

    var basepath = Kirby.root('languages');
    const existingLanguages = fg.sync(['languages/[a-z]{2}.php'], {onlyFiles: true});

    plop.setGenerator('language', {
        description: 'make a language file',
        prompts: [{
            type: 'input',
            name: 'filename',
            message: 'Language Code (' + existingLanguages.join(',') +')',
            default: 'en',
        }],
        actions: [{
            type: 'add',
            path: basepath + '/{{saveFilename filename }}.php',
            templateFile: 'language.hbs'
        }]
    });
};

