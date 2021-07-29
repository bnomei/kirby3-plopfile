const Kirby = require('./helpers/kirby.js');
const F = require('./helpers/f.js');
const A = require('./helpers/a.js');

module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
        if (text == undefined) text = '';
        return text.toLowerCase()
            .replace('.php', '');
    });

    var basepath = Kirby.root('snippets'); 

    plop.setGenerator('snippet', {
        description: 'make a snippet file',
        prompts: [{
            type: 'input',
            name: 'filename',
            message: 'Filename',
        },
        {
            type: 'checkbox',
            name: 'options',
            message: 'Options',
            choices: [
                { name: 'declare strict types', value: 'declareStrictTypes', checked: false},
                { name: 'add type hints for $page, $site and $kirby', value: 'typeHintCoreObjects', checked: false},
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
            templateFile: 'snippet.php.hbs'
        },
        function(data) {
            let path = plop.renderString(basepath + '/{{saveFilename template }}.php', data);
            return F.clipboard(plop, path, '@PLOP_CURSOR');
        }]
    });
};

