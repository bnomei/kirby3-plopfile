const F = require("./utils/f.js");
const helper = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("plugins");
  const pattern = /^( *)(\/\/ @PLOP_EXT_KIRBYTAG)\r?\n/gim;

  plop.setHelper("commaSpace", helper.commaSpace);

  plop.setGenerator("ext-kirbytag", {
    description: "append kirbytag code to a file",
    prompts: [
      prompts.folder(basepath),
      prompts.key(),
      prompts.attr(),
      prompts.params("$tag"),
      prompts.todo(),
    ],
    actions: [
      function (data) {
        data = kirby.resolvePluginInclude(data, basepath);
        data.attr = data.attr
          .replace(" ", "")
          .split(",")
          .map((value) => {
            return {
              value: value,
            };
          });
      },
      {
        path: "{{ indexphp }}",
        type: "modify",
        pattern: pattern,
        templateFile: "ext-kirbytag.php.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.indexphp, pattern);
      },
    ],
  });
};
