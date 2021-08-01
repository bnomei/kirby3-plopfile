const F = require("./utils/f.js");
const helper = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("plugins");
  const pattern = /^( *)(\/\/ @PLOP_EXT_COLLECTION_FILTER)\r?\n/gim;

  plop.setHelper("commaSpace", helper.commaSpace);

  let route_prompts = [
    prompts.folder(basepath),
    prompts.key(),
    prompts.params(),
    prompts.todo(),
  ];

  plop.setGenerator("ext-collection-filter", {
    description: "append collection filter code to a file",
    prompts: route_prompts,
    actions: [
      function (data) {
        data = kirby.resolvePluginInclude(data, basepath);
      },
      {
        path: "{{ indexphp }}",
        type: "modify",
        pattern: pattern,
        templateFile: "ext-collection-filter.php.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.indexphp, pattern);
      },
    ],
  });
};
