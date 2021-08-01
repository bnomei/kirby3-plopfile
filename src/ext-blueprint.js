const F = require("./utils/f.js");
const helper = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("plugins");
  const pattern = /^( *)(\/\/ @PLOP_EXT_BLUEPRINT)\r?\n/gim;

  plop.setHelper("wrapValue", helper.wrapValue);

  plop.setGenerator("ext-blueprint", {
    description: "append blueprint code to a file",
    prompts: [prompts.folder(basepath), prompts.file()],
    actions: [
      function (data) {
        data = kirby.resolvePluginInclude(data, basepath, "blueprints");
        console.log(data);
      },
      {
        path: "{{ indexphp }}",
        type: "modify",
        pattern: pattern,
        templateFile: "ext-blueprint.php.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.indexphp, pattern);
      },
    ],
  });
};
