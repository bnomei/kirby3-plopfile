const Kirby = require("./helpers/kirby.js");
const F = require("./helpers/f.js");

module.exports = function (plop) {
  let basepath = Kirby.root("index");

  plop.setHelper("wrapValue", function (value) {
    if (typeof value === "number" || typeof value === "boolean") {
      return value;
    }
    if (typeof value === "string" && value.startsWith("function")) {
      return value;
    }
    return "'" + value + "'";
  });

  plop.setGenerator("ext-option", {
    description: "append option code to a file",
    prompts: [
      {
        type: "input",
        name: "file",
        message: "File",
        default: basepath + "/",
      },
      {
        type: "input",
        name: "key",
        message: "Key",
      },
      {
        type: "input",
        name: "value",
        message: "Value",
      },
    ],
    actions: [
      function (data) {
        data.file = F.findFile(data.file);
      },
      {
        path: "{{{ file }}}",
        type: "modify",
        pattern: /^( *)(\/\/ @PLOP_EXT_OPTION)\r?\n/gim,
        templateFile: "ext-option.php.hbs",
      },

      function (data) {
        return F.clipboard(plop, data.file, "@PLOP_CURSOR");
      },
    ],
  });
};
