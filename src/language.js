const Kirby = require('./helpers/kirby.js');
const fg = require('fast-glob');
const Clipboardy = require('clipboardy');

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
        },
        function(data) {
            let path = plop.renderString(basepath + '/{{saveFilename code }}.php', data);
            console.log("\n" + F.read(path));
            Clipboardy.writeSync(path);
            return 'Path has been copied to clipboard.'
        }]
    });
};

