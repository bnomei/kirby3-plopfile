const Kirby = require('./helpers/kirby.js');
const F = require('./helpers/f.js');
const A = require('./helpers/a.js');

module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
        if (text == undefined) text = '';
        return text.toLowerCase()
            .replace('.php', '');
    });
    plop.setHelper('trimFirstDot', function (text) {
        return text.replace(/^\./, '');
    });
    plop.setHelper('removeExtensionUnlessPHP', function (text) {
        return text == '.php' ? '.php' : ''; // match exactly for better blade/twig support
    });

    var basepath = Kirby.root('templates'); 

    plop.setGenerator('template', {
        description: 'make a template file',
        prompts: [{
            type: 'input',
            name: 'template',
            message: 'Template',
        },
        {
            type: 'input',
            name: 'extension',
            message: 'Extension',
            default: '.php',
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
            path: basepath + '/{{saveFilename template }}.{{trimFirstDot extension }}',
            templateFile: 'template{{removeExtensionUnlessPHP extension}}.hbs'
        },
        function(data) {
            let path = plop.renderString(basepath + '/{{saveFilename template }}.{{trimFirstDot extension }}', data);
            return F.clipboard(plop, path, '@PLOP_CURSOR');
            
        }]
    });
};

