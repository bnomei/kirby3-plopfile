const F = require("./utils/f.js");
const helpers = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");
const choices = require("./utils/choices.js");

module.exports = function (plop) {
  const basepath = kirby.root("config");

  plop.setHelper("filenameWithoutExtension", helpers.filenameWithoutExtension);
  plop.setHelper("wrapValue", helpers.wrapValue);

  plop.setGenerator("config", {
    description: "make a config file",
    prompts: [
      {
        type: "input",
        name: "filename",
        message: "Filename",
        default: "config",
      },
      prompts.import(),
      {
        type: "checkbox",
        name: "extensions",
        message: "Extensions",
        choices: [
          choices.hook(true),
          choices.option(true),
          choices.route(true),
        ],
      },
    ],
    actions: [
      function (data) {
        data.path = kirby.autopath(
          "{{trimTrailingSlash folder}}/{{filenameWithoutExtension filename }}.php",
          basepath
        );
        data.data = F.load(data.import);
        data.extensions = A.flip(data.extensions);
        return data.data;
      },
      {
        type: "add",
        path: "{{ path }}",
        templateFile: "config.php.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.path, "@PLOP_CURSOR");
      },
    ],
  });
};
