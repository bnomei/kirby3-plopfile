const F = require("./utils/f.js");
const helper = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("config");

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

  route_prompts.push(prompts.todo());

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
        pattern: /^( *)(\/\/ @PLOP_EXT_ROUTE)\r?\n/gim,
        templateFile: "ext-route.php.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.file, "@PLOP_EXT_ROUTE");
      },
    ],
  });
};
