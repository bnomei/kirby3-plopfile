const Kirby = require('./helpers/kirby.js');
const F = require('./helpers/f.js');
const Clipboardy = require('clipboardy');

module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
        return text.toLowerCase()
            .replace(' ', '');
    });
    plop.setHelper('wrapValue', function (value) {
        if (typeof value === 'number' || typeof value === 'boolean') {
            return value;
        }
        if (typeof value === 'string' && value.startsWith('function')) {
            return value;
        }
        return "'"+ value +"'";
    });

    var basepath = Kirby.root('languages');
    const existingLanguages = Kirby.languages();

    plop.setGenerator('language', {
        description: 'make a language file',
        prompts: [{
            type: 'input',
            name: 'code',
            message: 'Language Code (' + existingLanguages.join(',') +')',
            default: 'en',
        },
        {
            type: 'confirm',
            name: 'default',
            message: 'Is this the default language?',
        },
        {
            type: 'input',
            name: 'direction',
            message: 'Reading direction',
            default: 'ltr',
        },
        {
            type: 'input',
            name: 'locale',
            message: 'Language locale',
            default: 'en_EN',
        },
        {
            type: 'input',
            name: 'name',
            message: 'Language name',
            default: 'English',
        },
        {
            type: 'input',
            name: 'url',
            message: 'URL',
            default: 'en',
        },
        {
            type: 'input',
            name: 'import',
            message: 'Import translation data from json string, json or yml file (optional)',
            default: '{}'
        }
        ],
        actions: [
        function (data) {
            data['data'] = F.load(data['import']);
            return data['data'];
        },
        {
            type: 'add',
            path: basepath + '/{{saveFilename code }}.php',
            templateFile: 'language.php.hbs'
        },
        function(data) {
            let path = plop.renderString(basepath + '/{{saveFilename code }}.php', data);
            console.log("\n" + F.read(path));
            Clipboardy.writeSync(path);
            return 'Path has been copied to clipboard.'
        }]
    });
};

