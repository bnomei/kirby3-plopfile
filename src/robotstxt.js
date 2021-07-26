const Kirby = require('./helpers/kirby.js');

module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
        return text.toLowerCase()
            .replace('.php', '');
    });

    var basepath = Kirby.root('index');

    plop.setGenerator('robotstxt', {
        description: 'make a robots.txt file',
        prompts: [/*{
            type: 'input',
            name: 'template',
            message: 'Template',
        }*/],
        actions: [{
            type: 'add',
            path: basepath + 'robots.txt',
            templateFile: 'robotstxt.hbs'
        }]
    });
};

