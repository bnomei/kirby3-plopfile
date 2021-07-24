module.exports = function (plop) {
    plop.setHelper('toLowerCase', function (text) {
        return text.toLowerCase();
    });

    var basepath = "./site/controllers/"; // TODO: use helper to guess kirby root by globing

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
            path: basepath . '{{toLowerCase template }}.php',
            templateFile: 'controller.hbs'
        }]
    });
};

