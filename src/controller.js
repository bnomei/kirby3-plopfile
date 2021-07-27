const Kirby = require('./helpers/kirby.js');

module.exports = function (plop) {
    plop.setHelper('toLowerCase', function (text) {
        return text.toLowerCase();
    });

    var basepath = Kirby.root('controllers');

    plop.setGenerator('controller', {
        description: 'make a controller file',
        prompts: [{
            type: 'input',
            name: 'template',
            message: 'Template',
            default: 'default',
        }],
        actions: [{
            type: 'add',
            path: basepath + '/{{toLowerCase template }}.php',
            templateFile: 'controller.php.hbs'
        }]
    });
};

