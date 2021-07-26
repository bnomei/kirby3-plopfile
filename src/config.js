const Kirby = require('./helpers/kirby.js');

module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
        return text.toLowerCase()
            .replace('.php', '')
            .replace(' ', '-');
    });

    var basepath = Kirby.root("config");

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
            path: basepath + '/{{saveFilename filename }}.php',
            templateFile: 'config.hbs'
        }]
    });
};

