const Kirby = require('./helpers/kirby.js');
const fg = require('fast-glob');

module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
        return text.toLowerCase()
            .replace(' ', '');
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
        }],
        actions: [{
            type: 'add',
            path: basepath + '/{{saveFilename code }}.php',
            templateFile: 'language.php.hbs'
        }]
    });
};

