module.exports = function (plop) {

    var basepath = './'; // TODO: use helper to guess kirby root by globing
    plop.setGenerator('htaccess', {
        description: 'make default starterkit htaccess file',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'controller name please'
        }],
        actions: [{
            type: 'add',
            path: basepath . '.htaccess',
            templateFile: 'htaccess.hbs'
        }]
    });
};

