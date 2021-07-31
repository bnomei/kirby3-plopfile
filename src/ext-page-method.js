const F = require("./utils/f.js");
const helper = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("plugins");

  plop.setHelper("wrapValue", helper.wrapValue);

  plop.setGenerator("ext-page-method", {
    description: "append page-method code to a file",
    prompts: [prompts.folder(basepath), prompts.key(), prompts.value()],
    actions: [
      function (data) {
        data = kirby.resolvePluginInclude(data, basepath);
      },
      {
        path: "{{ indexphp }}",
        type: "modify",
        pattern: /^( *)(\/\/ @PLOP_EXT_PAGE_METHOD)\r?\n/gim,
        templateFile: "ext-page-method.php.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.indexphp, "@PLOP_EXT_PAGE_METHOD");
      },
    ],
  });
};
