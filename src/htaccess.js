const Kirby = require('./helpers/kirby.js');
const Clipboardy = require('clipboardy');

module.exports = function (plop) {

    var basepath = Kirby.root('index');

    plop.setGenerator('htaccess', {
        description: 'make default starterkit htaccess file',
        prompts: [{
            type: 'input',
            name: 'folder',
            message: 'Folder (optional)',
            default: basepath,
        }],
        actions: [{
            type: 'add',
            path: basepath + '{{#if folder}}/{{saveFoldername folder }}{{/if}}/.htaccess',
            templateFile: 'htaccess.starterkit.hbs'
        },
        function(data) {
            let path = plop.renderString(basepath + '/{{#if folder}}/{{saveFoldername folder }}{{/if}}/.htaccess', data);
            console.log(F.read(path));
            Clipboardy.writeSync(path);
            return 'Path has been copied to clipboard.'
        }]
    });
};

