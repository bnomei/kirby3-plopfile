const F = require("./utils/f.js");
const helper = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("plugins");
  const pattern = /^( *)(\/\/ @PLOP_EXT_API_ROUTE)\r?\n/gim;

  plop.setHelper("commaSpace", helper.commaSpace);
  plop.setHelper("toLowerCase", helper.toLowerCase);
  plop.setHelper("wrapValue", helper.wrapValue);

  let route_prompts = [
    prompts.folder(basepath),
    prompts.pattern(),
    prompts.params(),
    prompts.method(),
    prompts.todo(),
  ];

  plop.setGenerator("ext-api-route", {
    description: "append api-route code to a file",
    prompts: route_prompts,
    actions: [
      function (data) {
        data = kirby.resolvePluginInclude(data, basepath);
      },
      {
        path: "{{ indexphp }}",
        type: "modify",
        pattern: pattern,
        templateFile: "ext-api-route.php.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.indexphp, pattern);
      },
    ],
  });
};
