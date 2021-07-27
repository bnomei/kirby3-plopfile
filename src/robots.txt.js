const Kirby = require('./helpers/kirby.js');
const Clipboardy = require('clipboardy');

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
        },
        function(data) {
            let path = plop.renderString(basepath + '{{#if folder}}/{{saveFoldername folder }}{{/if}}/robots.txt', data);
            console.log(F.read(path));
            Clipboardy.writeSync(path);
            return 'Path has been copied to clipboard.'
        }]
    });
};

