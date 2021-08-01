const A = require("./utils/a.js");
const F = require("./utils/f.js");
const helpers = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");
const choices = require("./utils/choices.js");

module.exports = function (plop) {
  const basepath = kirby.root("config");

  plop.setHelper("filenameWithoutExtension", helpers.filenameWithoutExtension);
  plop.setHelper("trimTrailingSlash", helpers.trimTrailingSlash);
  plop.setHelper("wrapValue", helpers.wrapValue);

  let defaultChoices = [
    choices.hook(true),
    choices.option(true),
    choices.route(true),
    choices.none(),
    choices.defaults(),
    choices.all(),
  ];

  plop.setGenerator("config", {
    description: "make a config file",
    prompts: [
      // prompts.folder(basepath),
      prompts.file("config"),
      {
        type: "checkbox",
        name: "extensions",
        message: "Extensions",
        choices: defaultChoices,
      },
      prompts.import(),
    ],
    actions: [
      function (data) {
        data.folder = basepath;
        data.path = kirby.autopath(
          plop.renderString(
            "{{trimTrailingSlash folder}}/{{filenameWithoutExtension file }}.php",
            data
          ),
          basepath
        );
        data.data = F.load(data.import);
        data.extensions = choices.make(data.extensions, defaultChoices);
        return data.data;
      },
      {
        type: "add",
        path: "{{ path }}",
        templateFile: "config.php.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.path);
      },
    ],
  });
};
