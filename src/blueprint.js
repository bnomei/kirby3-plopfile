const Kirby = require('./helpers/kirby.js');

module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
        return text.toLowerCase()
            .replace('.php', '')
            .replace('.yml', '');
    });

    const basepath = Kirby.root("blueprints");

    plop.setGenerator('blueprint', {
        description: 'make a blueprint file',
        prompts: [{
            type: 'list',
            name: 'type',
            choices: ['fields', 'files', 'layouts', 'pages', 'sections', 'users']
        },
        {
            type: 'input',
            name: 'template',
            message: 'Template',
        }],
        // TODO: php files
        // TODO: subfolders
        actions: [{
            type: 'add',
            path: basepath + '/{{ type }}/{{saveFilename template }}.yml',
            templateFile: 'blueprint.hbs'
        }]
    });
};

