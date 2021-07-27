const Kirby = require('./helpers/kirby.js');

module.exports = function (plop) {

    var basepath = Kirby.root('index');

    plop.setGenerator('htaccess', {
        description: 'make default starterkit htaccess file',
        prompts: [{
            type: 'input',
            name: 'folder',
            message: 'Folder (optional)',
            default: basepath,
        }],
        actions: [{
            type: 'add',
            path: basepath + '{{#if folder}}/{{saveFoldername folder }}{{/if}}/.htaccess',
            templateFile: 'htaccess.starterkit.hbs'
        }]
    });
};

