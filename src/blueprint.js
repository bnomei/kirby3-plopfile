const Kirby = require('./helpers/kirby.js');

module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
        return text.toLowerCase()
            .replace('.php', '')
            .replace('.yml', '');
    });
    plop.setHelper('trimFirstDot', function (text) {
        return text.replace(/^\./, "");
    });

    const basepath = Kirby.root("blueprints");

    plop.setGenerator('blueprint', {
        description: 'make a blueprint file',
        prompts: [{
            type: 'list',
            name: 'type',
            choices: Kirby.blueprintTypes(),
        },
        {
            type: 'input',
            name: 'template', // subfolders can be done like this: 'mysub/tempname'
            message: 'Template',
        },
        {
            type: 'input',
            name: 'extension',
            message: 'Extension',
            default: '.yml',
        }
        ],
        actions: [{
            type: 'add',
            path: basepath + '/{{ type }}/{{saveFilename template }}.{{trimFirstDot extension }}',
            templateFile: 'blueprint.{{trimFirstDot extension }}.hbs'
        }]
    });
};

