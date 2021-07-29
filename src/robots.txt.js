const Kirby = require('./helpers/kirby.js');
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
            path: '{{#if folder}}{{ folder }}{{else}}'+ basepath +'{{/if}}/robots.txt',
            templateFile: 'robots.txt.hbs'
        },
        function(data) {
            let path = plop.renderString('{{#if folder}}{{ folder }}{{else}}'+ basepath +'{{/if}}/robots.txt', data);
            return F.clipboard(plop, path, '@PLOP_CURSOR');
        },
        function () {
            return '[SUGGESTS] https://github.com/bnomei/kirby3-robots-txt'
        }]
    });
};

