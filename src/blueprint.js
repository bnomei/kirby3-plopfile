const Kirby = require('./helpers/kirby.js');
const YAML = require('js-yaml');
const F = require('./helpers/f.js');
const Clipboardy = require('clipboardy');

module.exports = function (plop) {
    plop.setHelper('saveFilename', function (text) {
        return text.toLowerCase()
            .replace('.php', '')
            .replace('.yml', '');
    });
    plop.setHelper('trimFirstDot', function (text) {
        return text.replace(/^\./, "");
    });

    const basepath = Kirby.root("blueprints");

    plop.setGenerator('blueprint', {
        description: 'make a blueprint file',
        prompts: [{
            type: 'list',
            name: 'type',
            choices: Kirby.blueprintTypes(),
        },
        {
            type: 'input',
            name: 'template', // subfolders can be done like this: 'mysub/tempname'
            message: 'Template',
        },
        {
            type: 'input',
            name: 'extension',
            message: 'Extension',
            default: '.yml',
        },
        {
            type: 'input',
            name: 'import',
            message: 'Import data from json string, json or yml file (optional)',
            default: '{}'
        }
        ],
        actions: [
        function (data) {
            data['data'] = F.load(data['import']);
            data['yaml'] = YAML.dump(data['data']);
            return data['data'];
        },
        {
            type: 'add',
            path: basepath + '/{{ type }}/{{saveFilename template }}.{{trimFirstDot extension }}',
            templateFile: 'blueprint.{{trimFirstDot extension }}.hbs'
        },
        function(data) {
            let path = plop.renderString(basepath + '/{{ type }}/{{saveFilename template }}.{{trimFirstDot extension }}', data);
            console.log("\n" + F.read(path));
            Clipboardy.writeSync(path);
            return 'Path has been copied to clipboard.'
        }]
    });
};

