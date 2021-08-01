const F = require("./utils/f.js");
const hooks = require("./utils/hooks.js");
const helper = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("plugins");
  const pattern = /^( *)(\/\/ @PLOP_EXT_HOOK)\r?\n/gim;

  plop.setHelper("commaSpace", helper.commaSpace);
  plop.setHelper("wrapValue", helper.wrapValue);

  plop.setGenerator("ext-hook", {
    description: "append hook code to a file",
    prompts: [
      prompts.folder(basepath),
      prompts.hooks(hooks.all()),
      prompts.todo(),
    ],
    actions: [
      function (data) {
        data = kirby.resolvePluginInclude(data, basepath);
        data.params = hooks.params(data.hook);
      },
      {
        path: "{{ indexphp }}",
        type: "modify",
        pattern: pattern,
        templateFile: "ext-hook.php.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.indexphp, pattern);
      },
    ],
  });
};
