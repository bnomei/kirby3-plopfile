const F = require("./utils/f.js");
const helpers = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("languages");
  const existingLanguages = kirby.languages();

  plop.setHelper("toLowerCase", helpers.toLowerCase);
  plop.setHelper("trimTrailingSlash", helpers.trimTrailingSlash);
  plop.setHelper("wrapValue", helpers.wrapValue);

  plop.setGenerator("language", {
    description: "make a language file",
    prompts: [
      {
        type: "input",
        name: "code",
        message: "Language Code (" + existingLanguages.join(",") + ")",
        default: "en",
      },
      {
        type: "confirm",
        name: "default",
        message: "Is this the default language?",
      },
      {
        type: "input",
        name: "direction",
        message: "Reading direction",
        default: "ltr",
      },
      {
        type: "input",
        name: "locale",
        message: "Language locale",
        default: "en_EN",
      },
      {
        type: "input",
        name: "name",
        message: "Language name",
        default: "English",
      },
      {
        type: "input",
        name: "url",
        message: "URL",
        default: "en",
      },
      {
        type: "input",
        name: "import",
        message:
          "Import translation data from json string, json or yml file (optional)",
        default: "{}",
      },
    ],
    actions: [
      function (data) {
        data.path = kirby.autopath(
          plop.renderString(
            "{{trimTrailingSlash folder}}/{{toLowerCase code }}.php",
            data
          ),
          basepath
        );
        data.data = F.load(data.import);
        return data.data;
      },
      {
        type: "add",
        path: "{{ path }}",
        templateFile: "language.php.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.path, "@PLOP_CURSOR");
      },
    ],
  });
};
