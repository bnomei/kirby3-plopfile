const F = require("./utils/f.js");
const helper = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("config");
  const pattern = /^( *)(\/\/ @PLOP_EXT_ROUTE)\r?\n/gim;

  plop.setHelper("commaSpace", helper.commaSpace);
  plop.setHelper("toLowerCase", helper.toLowerCase);
  plop.setHelper("wrapValue", helper.wrapValue);

  let route_prompts = [
    prompts.file(basepath),
    prompts.pattern(),
    prompts.params(),
    prompts.method(),
    prompts.todo(),
  ];

  const existingLanguages = kirby.languages();
  if (existingLanguages.length) {
    route_prompts.push(prompts.language(existingLanguages));
  }

  plop.setGenerator("config-route", {
    description: "append route code to a config file",
    prompts: route_prompts,
    actions: [
      function (data) {
        data = kirby.resolvePluginInclude(data, basepath);
      },
      {
        path: "{{ file }}",
        type: "modify",
        pattern: pattern,
        templateFile: "ext-route.php.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.file, pattern);
      },
    ],
  });
};
