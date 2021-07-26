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
            name: 'pluginname',
            message: 'Plugin name',
        }],
        actions: [{
            type: 'add',
            path: basepath + '/{{saveFilename pluginname }}/index.php',
            templateFile: 'plugin.hbs'
        }]
    });
};

