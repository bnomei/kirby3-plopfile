const F = require("./utils/f.js");
const helper = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("config");
  const pattern = /^( *)(\/\/ @PLOP_EXT_OPTION)\r?\n/gim;

  plop.setHelper("wrapValue", helper.wrapValue);

  plop.setGenerator("config-option", {
    description: "append option code to a config file",
    prompts: [prompts.file(basepath), prompts.key(), prompts.value()],
    actions: [
      function (data) {
        data = kirby.resolvePluginInclude(data, basepath);
      },
      {
        path: "{{ file }}",
        type: "modify",
        pattern: /^( *)(\/\/ @PLOP_EXT_OPTION)\r?\n/gim,
        templateFile: "ext-option.php.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.file, pattern);
      },
    ],
  });
};
