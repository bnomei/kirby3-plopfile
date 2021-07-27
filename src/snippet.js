const Kirby = require('./helpers/kirby.js');
const Clipboardy = require('clipboardy');

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
            templateFile: 'snippet.php.hbs'
        },
        function(data) {
            let path = plop.renderString(basepath + '/{{saveFilename template }}.php', data);
            console.log(F.read(path));
            Clipboardy.writeSync(path);
            return 'Path has been copied to clipboard.'
        }]
    });
};

