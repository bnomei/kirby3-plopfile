const Kirby = require('./helpers/kirby.js');

module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
        if (text == undefined) text = '';
        return text.toLowerCase()
            .replace('.php', '');
    });
    plop.setHelper('trimFirstDot', function (text) {
        return text.replace(/^\./, "");
    });

    var basepath = Kirby.root('templates'); 

    plop.setGenerator('template', {
        description: 'make a model file',
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
            templateFile: 'template.hbs'
        }]
    });
};

