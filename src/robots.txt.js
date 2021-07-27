const Kirby = require('./helpers/kirby.js');

module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
        return text.toLowerCase()
            .replace('.php', '');
    });

    var basepath = Kirby.root('index');

    plop.setGenerator('robotstxt', {
        description: 'make a robots.txt file',
        prompts: [{
            type: 'input',
            name: 'folder',
            message: 'Folder (optional)',
            default: basepath,
        }],
        actions: [{
            type: 'add',
            path: basepath + '{{#if folder}}/{{saveFoldername folder }}{{/if}}/robots.txt',
            templateFile: 'robots.txt.hbs'
        }]
    });
};

