const F = require("./utils/f.js");
const helper = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("index");

  plop.setHelper("commaSpace", helper.commaSpace);
  plop.setHelper("toLowerCase", helper.toLowerCase);
  plop.setHelper("wrapValue", helper.wrapValue);

  let route_prompts = [
    prompts.file(basepath),
    {
      type: "input",
      name: "pattern",
      message: "Pattern",
    },
    {
      type: "input",
      name: "method",
      message: "Method",
    },
  ];

  const existingLanguages = kirby.languages();
  if (existingLanguages.length) {
    route_prompts.push(prompts.language(existingLanguages));
  }

  route_prompts.push(prompts.todo());

  plop.setGenerator("ext-route", {
    description: "append route code to a file",
    prompts: route_prompts,
    actions: [
      function (data) {
        data.file = F.findFile(data.file);
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
