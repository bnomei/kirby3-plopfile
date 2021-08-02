const F = require("./utils/f.js");
const helper = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("site");
  const pattern = /^( *)(\/\/ @PLOP_EXT_TEMPLATE)\r?\n/gim;

  plop.setGenerator("ext-template", {
    description: "append template include to an index.php",
    prompts: [prompts.folder(basepath), prompts.file()],
    actions: [
      function (data) {
        data = kirby.resolvePluginInclude(data, basepath);
      },
      {
        path: "{{ indexphp }}",
        type: "modify",
        pattern: pattern,
        templateFile: "ext-template.php.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.indexphp, pattern);
      },
    ],
  });
};
