module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
        return text.toLowerCase()
            .replace('.php', '');
    });

    var basepath = "./site/models/"; // TODO: use helper to guess kirby root by globing

    plop.setGenerator('model', {
        description: 'make a model file',
        prompts: [{
            type: 'input',
            name: 'template',
            message: 'Template',
        }],
        actions: [{
            type: 'add',
            path: basepath . '{{saveFilename filename }}.php',
            templateFile: 'model.hbs'
        }]
    });
};

