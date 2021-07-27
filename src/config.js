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
        },
        {
            type: 'input',
            name: 'import',
            message: 'Import data from json string, json or yml file (optional)',
            default: '{}'
        }
        ],
        actions: [
        function (data) {
            data['data'] = F.load(data['import']);
        },
        {
            type: 'add',
            path: basepath + '/{{saveFilename filename }}.php',
            templateFile: 'config.hbs'
        }]
    });
};

