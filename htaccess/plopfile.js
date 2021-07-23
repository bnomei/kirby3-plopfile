module.exports = function (plop) {
    plop.setGenerator('htaccess', {
        description: 'make default starterkit htaccess file',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'controller name please'
        }],
        actions: [{
            type: 'add',
            path: '.htaccess',
            templateFile: 'starterkit.hbs'
        }]
    });
};

