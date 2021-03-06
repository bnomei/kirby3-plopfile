const F = require("./utils/f.js");
const helper = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("plugins");
  const pattern = /^( *)(\/\/ @PLOP_EXT_FIELD_METHOD)\r?\n/gim;

  plop.setHelper("commaSpace", helper.commaSpace);
  plop.setHelper("toLowerCase", helper.toLowerCase);
  plop.setHelper("wrapValue", helper.wrapValue);

  plop.setGenerator("ext-field-method", {
    description: "append field method code to a file",
    prompts: [
      prompts.folder(basepath),
      prompts.key(),
      prompts.params("$field"),
      prompts.todo(),
    ],
    actions: [
      function (data) {
        data = kirby.resolvePluginInclude(data, basepath);
      },
      {
        path: "{{ indexphp }}",
        type: "modify",
        pattern: pattern,
        templateFile: "ext-field-method.php.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.indexphp, pattern);
      },
    ],
  });
};
