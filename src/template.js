const Kirby = require('./helpers/kirby.js');
const Clipboardy = require('clipboardy');

module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
        if (text == undefined) text = '';
        return text.toLowerCase()
            .replace('.php', '');
    });
    plop.setHelper('trimFirstDot', function (text) {
        return text.replace(/^\./, '');
    });
    plop.setHelper('removeExtensionUnlessPHP', function (text) {
        return text == '.php' ? '.php' : ''; // match exactly for better blade/twig support
    });

    var basepath = Kirby.root('templates'); 

    plop.setGenerator('template', {
        description: 'make a template file',
        prompts: [{
            type: 'input',
            name: 'template',
            message: 'Template',
        },
        {
            type: 'input',
            name: 'extension',
            message: 'Extension',
            default: '.php',
        }],
        actions: [{
            type: 'add',
            path: basepath + '/{{saveFilename template }}.{{trimFirstDot extension }}',
            templateFile: 'template{{removeExtensionUnlessPHP extension}}.hbs'
        },
        function(data) {
            let path = plop.renderString(basepath + '/{{saveFilename template }}.{{trimFirstDot extension }}', data);
            console.log("\n" + F.read(path));
            Clipboardy.writeSync(path);
            return 'Path has been copied to clipboard.'
        }]
    });
};

