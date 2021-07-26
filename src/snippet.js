const Kirby = require('./helpers/kirby.js');

module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
        if (text == undefined) text = '';
        return text.toLowerCase()
            .replace('.php', '');
    });

    var basepath = Kirby.root('snippets'); 

    plop.setGenerator('snippet', {
        description: 'make a snippet file',
        prompts: [{
            type: 'input',
            name: 'filename',
            message: 'Filename',
        }],
        actions: [{
            type: 'add',
            path: basepath + '/{{saveFilename template }}.php',
            templateFile: 'snippet.hbs'
        }]
    });
};

