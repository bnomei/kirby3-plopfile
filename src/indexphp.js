const Kirby = require('./helpers/kirby.js');

module.exports = function (plop) {
    plop.setHelper('saveFoldername', function (text) {
        return text.toLowerCase()
            .replace('index.php', '')
            .replace(/\/$/, ""); // trim trailing slash
    });

    var basepath = Kirby.root('index');

    plop.setGenerator('indexphp', {
        description: 'make a index.php file',
        prompts: [{
            type: 'input',
            name: 'folder',
            message: 'Folder',
            default: basepath,
        }],
        actions: [{
            type: 'add',
            path: '{{saveFoldername folder }}/index.php',
            templateFile: 'indexphp.hbs'
        }]
    });
};

