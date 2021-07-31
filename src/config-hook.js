const F = require("./utils/f.js");
const helper = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("config");

  plop.setHelper("commaSpace", helper.commaSpace);
  plop.setHelper("wrapValue", helper.wrapValue);

  plop.setGenerator("config-hook", {
    description: "append hook code to a config file",
    prompts: [
      prompts.file(basepath),
      prompts.key(),
      prompts.params(),
      prompts.todo(),
    ],
    actions: [
      function (data) {
        data = kirby.resolvePluginInclude(data, basepath);
      },
      {
        path: "{{ file }}",
        type: "modify",
        pattern: /^( *)(\/\/ @PLOP_EXT_HOOK)\r?\n/gim,
        templateFile: "ext-hook.php.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.file, "@PLOP_EXT_HOOK");
      },
    ],
  });
};
