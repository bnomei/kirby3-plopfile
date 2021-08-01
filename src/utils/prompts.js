module.exports.import = function () {
  return {
    type: "input",
    name: "import",
    message: "Import data from json string, json or yml file",
    default: "{}",
  };
};

module.exports.extension = function (extension) {
  return {
    type: "input",
    name: "extension",
    message: "Extension",
    default: extension,
  };
};

module.exports.template = function (def) {
  return {
    type: "input",
    name: "template", // subfolders can be done like this: 'mysub/tempname'
    message: "Template",
    default: def,
  };
};

module.exports.file = function (def) {
  return {
    type: "input",
    name: "file",
    message: "File",
    default: def,
  };
};

module.exports.folder = function (def) {
  return {
    type: "input",
    name: "folder",
    message: "Folder",
    default: def,
  };
};

module.exports.key = function () {
  return {
    type: "input",
    name: "key",
    message: "Key",
  };
};

module.exports.value = function () {
  return {
    type: "input",
    name: "value",
    message: "Value",
  };
};

module.exports.pattern = function () {
  return {
    type: "input",
    name: "pattern",
    message: "Pattern",
  };
};

module.exports.method = function () {
  return {
    type: "input",
    name: "method",
    message: "Method",
  };
};

module.exports.params = function () {
  return {
    type: "input",
    name: "params",
    message: "Function Parameters (example: '$first, $second')",
  };
};

module.exports.todo = function () {
  return {
    type: "input",
    name: "todo",
    message: "Comment with TODO note",
  };
};

module.exports.language = function (choices) {
  return {
    type: "list",
    name: "language",
    message: "Language",
    choices: choices,
  };
};

module.exports.hooks = function (choices) {
  return {
    type: "list",
    name: "hook",
    message: "Hook",
    choices: choices,
  };
};

module.exports.setups = function (choices) {
  return {
    type: "list",
    name: "setup",
    message: "Setup",
    choices: choices,
  };
};
