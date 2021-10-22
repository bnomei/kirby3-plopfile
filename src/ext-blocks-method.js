const F = require("./utils/f.js");
const helper = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("plugins");
  const pattern = /^( *)(\/\/ @PLOP_EXT_BLOCKS_METHOD)\r?\n/gim;

  plop.setHelper("commaSpace", helper.commaSpace);

  plop.setGenerator("ext-blocks-method", {
    description: "append blocks method code to a file",
    prompts: [
      prompts.folder(basepath),
      prompts.key(),
      prompts.params(),
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
        templateFile: "ext-blocks-method.php.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.indexphp, pattern);
      },
    ],
  });
};
