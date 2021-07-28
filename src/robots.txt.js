const Kirby = require('./helpers/kirby.js');
const Clipboardy = require('clipboardy');
const F = require('./helpers/f.js');

module.exports = function (plop) {
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
            path: basepath + '{{#if folder}}/{{ folder }}{{/if}}/robots.txt',
            templateFile: 'robots.txt.hbs'
        },
        function(data) {
            let path = plop.renderString(basepath + '{{#if folder}}/{{ folder }}{{/if}}/robots.txt', data);
            console.log("\n" + F.read(path));
            Clipboardy.writeSync(path);
            return 'Path has been copied to clipboard.'
        },
        function () {
            return '[SUGGESTS] https://github.com/bnomei/kirby3-robots-txt'
        }]
    });
};

