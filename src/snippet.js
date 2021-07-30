const A = require("./utils/a.js");
const choices = require("./utils/choices.js");
const F = require("./utils/f.js");
const helpers = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("snippets");

  plop.setHelper("filenameWithoutExtension", helpers.filenameWithoutExtension);
  plop.setHelper("trimTrailingSlash", helpers.trimTrailingSlash);

  plop.setGenerator("snippet", {
    description: "make a snippet file",
    prompts: [
      prompts.folder(basepath),
      {
        type: "input",
        name: "filename",
        message: "Filename",
      },
      {
        type: "checkbox",
        name: "options",
        message: "Options",
        choices: [
          choices.declareStrictTypes(false),
          choices.typeHintCoreObjects(false),
        ],
      },
    ],
    actions: [
      function (data) {
        data.path = kirby.autopath(
          plop.renderString(
            "{{trimTrailingSlash folder }}/{{filenameWithoutExtension template }}.php",
            data
          ),
          basepath
        );
        data.options = A.flip(data.options);
      },
      {
        type: "add",
        path: "{{ path }}",
        templateFile: "snippet.php.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.path, "@PLOP_CURSOR");
      },
    ],
  });
};
