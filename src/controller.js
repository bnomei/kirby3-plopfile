const Kirby = require('./helpers/kirby.js');
const Clipboardy = require('clipboardy');

module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
        return text.toLowerCase();
    });

    var basepath = Kirby.root('controllers');

    plop.setGenerator('controller', {
        description: 'make a controller file',
        prompts: [{
            type: 'input',
            name: 'template',
            message: 'Template',
            default: 'default',
        }],
        actions: [{
            type: 'add',
            path: basepath + '/{{saveFilename template }}.php',
            templateFile: 'controller.php.hbs'
        },
        function(data) {
            let path = plop.renderString(basepath + '/{{saveFilename template }}.php', data);
            console.log(F.read(path));
            Clipboardy.writeSync(path);
            return 'Path has been copied to clipboard.'
        }]
    });
};

