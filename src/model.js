const Kirby = require('./helpers/kirby.js');
const Clipboardy = require('clipboardy');

module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
        return text.toLowerCase()
            .replace('.php', '');
    });

    var basepath = Kirby.root('models');

    plop.setGenerator('model', {
        description: 'make a model file',
        prompts: [{
            type: 'input',
            name: 'template',
            message: 'Template',
        }],
        actions: [{
            type: 'add',
            path: basepath + '/{{saveFilename template }}.php',
            templateFile: 'model.php.hbs'
        },
        function(data) {
            let path = plop.renderString(basepath + '/{{saveFilename template }}.php', data);
            console.log("\n" + F.read(path));
            Clipboardy.writeSync(path);
            return 'Path has been copied to clipboard.'
        }]
    });
};

