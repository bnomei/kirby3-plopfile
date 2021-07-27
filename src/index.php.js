const Kirby = require('./helpers/kirby.js');

module.exports = function (plop) {
    plop.setHelper('saveFoldername', function (text) {
        return text.toLowerCase()
            .replace('index.php', '')
            .replace(/\/$/, ""); // trim trailing slash
    });

    var basepath = Kirby.root('index');

    plop.setGenerator('indexphp', {
        description: 'make a index.php file',
        prompts: [{
            type: 'input',
            name: 'folder',
            message: 'Folder (optional)',
            default: basepath,
        }],
        actions: [{
            type: 'add',
            path: basepath + '{{#if folder}}/{{saveFoldername folder }}{{/if}}/index.php',
            templateFile: 'index.php.hbs'
        }]
    });
};

