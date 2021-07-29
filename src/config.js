const Kirby = require('./helpers/kirby.js');
const F = require('./helpers/f.js');

module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
        return text.toLowerCase()
            .replace('.php', '')
            .replace(' ', '-');
    });
    plop.setHelper('wrapValue', function (value) {
        if (typeof value === 'number' || typeof value === 'boolean') {
            return value;
        }
        if (typeof value === 'string' && value.startsWith('function')) {
            return value;
        }
        return "'"+ value +"'";
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
            return data['data'];
        },
        {
            type: 'add',
            path: basepath + '/{{saveFilename filename }}.php',
            templateFile: 'config.php.hbs'
        },
        function(data) {
            let path = plop.renderString(basepath + '/{{saveFilename filename }}.php', data);
            return F.clipboard(plop, path, '@PLOP_CURSOR');
        }]
    });
};

