const fs = require('fs');
const fg = require('fast-glob');
const YAML = require('js-yaml');
const Clipboardy = require('clipboardy');

module.exports.clipboard = function(plop, filepath, query = undefined)
{ 
    console.log("\n" + this.read(filepath));
    const search = this.searchLineAndColumn(filepath, query);
    const clip = plop.renderString(process.env.PLOP_CLIPBOARD ?? '{{ filepath }}', { filepath: filepath, line: search.line, column: search.column });
    Clipboardy.writeSync(clip);
    return '\n' + clip + '\n... has been copied to clipboard.';
}

module.exports.searchLineAndColumn = function(filepath, query = undefined)
{
    let result = { line: 1, column: 1};
    filepath = this.findFile(filepath);
    if (query && filepath) {
        const data = this.read(filepath);
        const lines = data.split(/\r?\n/);
        let lc = 0;
        lines.forEach((line) => {
            console.log('>>> ' + line);
            lc = lc + 1;
            if(line.indexOf(query) != -1) {
                result = { line: lc, column: line.indexOf(query)};
                return;
            }
        });
    }
    return result;

}

module.exports.read = function(filepath)
{
    return fs.readFileSync(filepath, { encoding: 'utf-8' });
}

module.exports.findFile = function (filepath) {
    if (! fs.existsSync(filepath)) {
        const files = fg.sync(['**/' + filepath], { onlyFiles: true });
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
        //console.log(err)
        return undefined;
    }
}

module.exports.parseYaml = function(data)
{
    try {
        return YAML.load(data);
    } catch(err) {
        //console.log(err)
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

