module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
        return text.toLowerCase()
            .replace('.php', '')
            .replace(' ', '-');
    });

    var basepath = "./site/config/"; // TODO: use helper to guess kirby root by globing

    plop.setGenerator('config', {
        description: 'make a config file',
        prompts: [{
            type: 'input',
            name: 'filename',
            message: 'Filename',
            default: 'config'
        }],
        // TODO: loop and add data for additional fields
        actions: [{
            type: 'add',
            path: basepath . '{{saveFilename filename }}.php',
            templateFile: 'config.hbs'
        }]
    });
};

