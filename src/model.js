const Kirby = require('./helpers/kirby.js');

module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
        return text.toLowerCase()
            .replace('.php', '');
    });

    var basepath = Kirby.root('models');

    plop.setGenerator('model', {
        description: 'make a model file',
        prompts: [{
            type: 'input',
            name: 'template',
            message: 'Template',
        }],
        actions: [{
            type: 'add',
            path: basepath + '/{{saveFilename template }}.php',
            templateFile: 'model.hbs'
        }]
    });
};

