const Kirby = require('./helpers/kirby.js');
const F = require('./helpers/f.js');
const A = require('./helpers/a.js');
const Clipboardy = require('clipboardy');

module.exports = function (plop) {
    plop.setHelper('toLowerCase', function (text) {
        return text.toLowerCase();
    });
    plop.setHelper('ucfirst', function (text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    });

    var basepath = Kirby.root('plugins');
    
    plop.setGenerator('plugin', {
        description: 'make a plugin index.php and composer.json file',
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
            name: 'prefix',
            message: 'Plugin repository prefix',
            default: 'kirby3-',
        },
        {
            type: 'checkbox',
            name: 'options',
            message: 'Options',
            choices: [
                { name: '[index.php] declare strict types', value: 'declareStrictTypes', checked: false},
                { name: '[index.php] include composer autoloader', value: 'includeComposerAutoloader', checked: false},
                { name: '[index.php] add kirby autoloader', value: 'addKirbyAutoloader', checked: false},
                { name: '[index.php] plugin options', value: 'pluginOptions', checked: true},
                { name: '[index.php] plugin option cache', value: 'pluginOptionCache', checked: false},
                { name: '[composer.json] PSR-4 autoloader', value: 'composerPsr4', checked: false},
                // { name: '[composer.json] require getkirby/composer-installer', value: 'composerInstaller', checked: false},
            ]
        },
        // TODO: confirm prompt: parcel package.js https://github.com/getkirby/pluginkit/blob/4-panel/package.json
        // TODO: confirm prompt: .gitignore https://github.com/getkirby/pluginkit/blob/4-panel/.gitignore & https://getkirby.com/docs/guide/plugins/plugin-setup-composer#support-for-plugin-installation-without-composer
        // TODO: confirm prompt: unittesting in phpunit.xml, dev-require, scripts, extras
        ],
        actions:[
        function (data)
        {
            data['options'] = A.flip(data['options']);
        },
        {
            type: 'add',
            path: basepath + '/{{toLowerCase prefix }}{{toLowerCase repository }}/index.php',
templateFile: 'plugin.index.php.hbs'
        },
        {
            type: 'add',
            path: basepath + '/{{toLowerCase prefix }}{{toLowerCase repository }}/composer.json',
templateFile: 'plugin.composer.json.hbs'
        },
        function(data) {
            let path = plop.renderString(basepath + '/{{toLowerCase prefix }}{{toLowerCase repository }}/index.php', data);
            console.log("\n" + F.read(path));
            Clipboardy.writeSync(path);
            return 'Path has been copied to clipboard.'
        }]
    });
};

