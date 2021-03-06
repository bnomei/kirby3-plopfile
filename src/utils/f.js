const fs = require("fs");
const fg = require("fast-glob");
const yaml = require("js-yaml");
const clipboardy = require("clipboardy");

module.exports.makeDir = function (dir, recursive = true) {
  fs.mkdirSync(dir, { recursive: recursive });
};

module.exports.clipboard = function (
  plop,
  filepath,
  query = undefined,
  render = true
) {
  if (process.env.PLOP_DEBUG === "true") {
    console.log("\n" + this.read(filepath));
  }
  const search = this.searchLineAndColumn(filepath, query);
  const clip = render
    ? plop.renderString(
        process.env.PLOP_CLIPBOARD ?? "{{ filepath }}:{{ line }}:{{ char }}",
        {
          filepath: filepath,
          line: search.line,
          column: search.column,
          char: search.char,
        }
      )
    : filepath;
  if (process.env.PLOP_CLIPBOARD !== "false") {
    clipboardy.writeSync(clip);
    return "\n" + clip + "\n... has been copied to clipboard.";
  }
  return filepath;
};

module.exports.searchLineAndColumn = function (filepath, regexp = undefined) {
  let result = { line: 1, column: 1, char: 1 };
  if (!regexp) return result;

  filepath = this.findFile(filepath);
  if (filepath) {
    const data = this.read(filepath);
    const lines = data.split(/\r?\n/);
    let lc = 0;
    lines.forEach((line) => {
      lc = lc + 1;
      if (regexp.test(line + "\n")) {
        // fake a linebreak for better regex support
        const idx = line.indexOf("@PLOP_") - 2; // [// ]@PLOP_ hack => 2 chars back and 0 indexed => 3
        if (idx < 1) idx = 1;
        result = { line: lc, column: idx, char: idx };
        return;
      }
    });
  }
  return result;
};

module.exports.read = function (filepath) {
  return fs.existsSync(filepath)
    ? fs.readFileSync(filepath, { encoding: "utf-8" })
    : filepath;
};

module.exports.findFile = function (filepath, base = "") {
  if (!fs.existsSync(filepath)) {
    if (base.length && !base.endsWith("/")) {
      base = base + "/";
    }
    const files = fg.sync([base + "**/" + filepath], { onlyFiles: true });
    if (files.length) filepath = files[0];
    else return undefined;
  }
  return filepath;
};

module.exports.findFolder = function (filepath, base = "") {
  if (!fs.existsSync(filepath)) {
    const files = fg.sync([base + "**/" + filepath], {
      onlyFiles: false,
      deep: 6,
    });
    if (files.length) filepath = files[0];
    else return undefined;
  }
  return filepath;
};

module.exports.parseJson = function (data) {
  try {
    return JSON.parse(data);
  } catch (err) {
    //console.log(err)
    return undefined;
  }
};

module.exports.parseYaml = function (data) {
  try {
    return yaml.load(data);
  } catch (err) {
    //console.log(err)
    return undefined;
  }
};

module.exports.loadJson = function (filepath, options = { encoding: "utf-8" }) {
  filepath = this.findFile(filepath);
  if (filepath == undefined) return undefined;

  let data = fs.readFileSync(filepath, options);
  return this.parseJson(data);
};

module.exports.loadYaml = function (filepath, options = { encoding: "utf-8" }) {
  filepath = this.findFile(filepath);
  if (filepath == undefined) return undefined;

  let data = fs.readFileSync(filepath, options);
  return this.parseYaml(data);
};

module.exports.load = function (input) {
  let data = undefined;
  if (input.length && input[0] == "{") {
    data = this.parseJson(input);
  }
  if (data == undefined) {
    data = this.loadJson(input);
  }
  if (data == undefined) {
    data = this.loadYaml(input);
  }
  return data;
};
