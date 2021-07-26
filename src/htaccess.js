const Kirby = require('./helpers/kirby.js');

module.exports = function (plop) {

    var basepath = Kirby.root('index');

    plop.setGenerator('htaccess', {
        description: 'make default starterkit htaccess file',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'controller name please'
        }],
        actions: [{
            type: 'add',
            path: basepath + '/.htaccess',
            templateFile: 'htaccess.starterkit.hbs'
        }]
    });
};

