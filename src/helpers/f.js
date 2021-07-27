const fs = require('fs');
const fg = require('fast-glob');
const YAML = require('js-yaml');

module.exports.findFile = function (filepath) {
    if (! fs.existsSync(filepath)) {
        const files = fg.sync(['./' + filepath], { onlyFiles: true });
        if (files.length) filepath = files[0];
        else return undefined;
    }
    return filepath;
}

module.exports.parseJson = function(data)
{
    try {
        return JSON.parse(data);
    } catch(err) {
        console.log(err)
        return undefined;
    }
}

module.exports.parseYaml = function(data)
{
    try {
        return YAML.load(data);
    } catch(err) {
        console.log(err)
        return undefined;
    }
}

module.exports.loadJson = function(filepath, options = { encoding: 'utf-8' })
{
    filepath = this.findFile(filepath);
    if (filepath == undefined) return undefined;

    let data = fs.readFileSync(filepath, options);
    return this.parseJson(data)
}

module.exports.loadYaml = function(filepath, options = { encoding: 'utf-8' })
{
    filepath = this.findFile(filepath);
    if (filepath == undefined) return undefined;

    let data = fs.readFileSync(filepath, options);
    return this.parseYaml(data)
}

module.exports.load = function(input)
{
    let data = undefined;
    if (input.length && input[0] == '{') {
        data = this.parseJson(input);
    }
    if (data == undefined) {
        data = this.loadJson(input);
    }
    if (data == undefined) {
        data = this.loadYaml(input);
    }
    return data;
}

