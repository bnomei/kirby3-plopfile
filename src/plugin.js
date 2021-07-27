const Kirby = require('./helpers/kirby.js');

module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
        return text.toLowerCase()
            .replace('.php', '');
    });

    var basepath = Kirby.root('plugins');
    
    plop.setGenerator('plugin', {
        description: 'make a plugin index.php file',
        prompts: [{
            type: 'input',
            name: 'user',
            message: 'Plugin created by user',
            default: 'kirby',
        },
        {
            type: 'input',
            name: 'repository',
            message: 'Plugin repository Id',
            default: 'plugin'
        },
        {
            type: 'input',
            name: 'folderprefix',
            message: 'Folder prefix',
            default: '',
        }],
        actions: [{
            type: 'add',
            path: basepath + '/{{ folderprefix }}{{saveFilename repository }}/index.php',
            templateFile: 'plugin.hbs'
        }]
    });
};

