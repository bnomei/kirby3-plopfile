const Kirby = require('./helpers/kirby.js');
const Clipboardy = require('clipboardy');
const F = require('./helpers/f.js');

module.exports = function (plop) {
    plop.setHelper('saveFoldername', function (text) {
        return text
            .replace('index.php', '')
            .replace(/\/$/, ""); // trim trailing slash
    });

    var basepath = Kirby.root('index');

    plop.setGenerator('indexphp', {
        description: 'make a index.php file',
        prompts: [{
            type: 'input',
            name: 'folder',
            message: 'Folder (optional)',
            default: basepath,
        },
        {
            type: 'list',
            name: 'type',
            message: 'Type',
            choices: [
                { name: 'default', value: 'default' },  
                { name: 'public folder for index and storage for persistent files', value: 'public-storage' },  
            ],
        }],
        actions: [{
            type: 'add',
            path: '{{#if folder}}{{saveFoldername folder }}{{else}}'+ basepath +'{{/if}}/index.php',
            templateFile: 'index.{{ type }}.php.hbs'
        },
        function(data) {
            let path = plop.renderString('{{#if folder}}{{saveFoldername folder }}{{else}}'+ basepath +'{{/if}}/index.php', data);
            console.log("\n" + F.read(path));
            Clipboardy.writeSync(path);
            return 'Path has been copied to clipboard.'
        }]
    });
};

