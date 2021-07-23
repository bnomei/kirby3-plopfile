const promptDirectory = require('inquirer-directory');
const Slugify = require('slugifyjs').fromLocale('en');

module.exports = function (plop) {
    plop.setPrompt('directory', promptDirectory);
    plop.setHelper('slugify', function (text) {
        return Slugify.parse(text);
    });

    plop.setGenerator('content', {
        description: 'make a content file',
        prompts: [{
            type: 'input',
            name: 'title',
            message: 'Title'
        },
        {
            type: 'directory',
            name: 'parent',
            basePath: './',
            message: 'Select the parent folder'
        },
        {
            type: 'input',
            name: 'template',
            message: 'Enter template name'
        }],
        // TODO: optional language via select or input
        // TODO: if language ask for different slug
        actions: [{
            type: 'add',
            path: '{{ parent }}/{{slugify title }}/{{ template }}.txt',
            templateFile: 'default.hbs'
        }]
    });
};

