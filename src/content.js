const Slugify = require('./slugify.js');

module.exports = function (plop) {
    plop.setHelper('slugify', function (text) {
        return Slugify.parse(text);
    });
    plop.setHelper('trimTrailingSlash', function (text) {
        return text.replace(/\/$/, "");
    });
    plop.setHelper('toLowerCase', function (text) {
        return text.toLowerCase();
    });
    
    var basepath = "./"; // TODO: use helper to guess kirby root by globing

    plop.setGenerator('content', {
        description: 'make a content file',
        prompts: [{
            type: 'input',
            name: 'title',
            message: 'Title'
        },
        {
            type: 'input',
            name: 'parent',
            basePath: basepath,
            message: 'Enter UID of the parent folder'
        },
        {
            type: 'input',
            name: 'template',
            message: 'Template',
            default: 'default',
        }],
        // TODO: optional language via select or input
        // TODO: if language ask for different slug
        // TODO: loop and add data for additional fields
        actions: [{
            type: 'add',
            path: '{{trimTrailingSlash parent }}/{{slugify title }}/{{toLowerCase template }}.txt',
            templateFile: 'content.hbs'
        }]
    });
};

