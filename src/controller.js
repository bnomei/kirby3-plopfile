const Kirby = require('./helpers/kirby.js');
const Clipboardy = require('clipboardy');
const F = require('./helpers/f.js');
const A = require('./helpers/a.js');

module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
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
        },
        {
            type: 'checkbox',
            name: 'options',
            message: 'Options',
            choices: [
                { name: 'declare strict types', value: 'declareStrictTypes', checked: false},
                { name: 'use namespaces', value: 'useNamespaces', checked: false},
            ]
        }],
        actions: [
        function (data)
        {
            data['options'] = A.flip(data['options']);
        },
        {
            type: 'add',
            path: basepath + '/{{saveFilename template }}.php',
            templateFile: 'controller.php.hbs'
        },
        function(data) {
            let path = plop.renderString(basepath + '/{{saveFilename template }}.php', data);
            console.log("\n" + F.read(path));
            Clipboardy.writeSync(path);
            return 'Path has been copied to clipboard.'
        }]
    });
};

