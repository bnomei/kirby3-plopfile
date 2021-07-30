const A = require("./utils/a.js");
const choices = require("./utils/choices.js");
const F = require("./utils/f.js");
const helpers = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("controllers");

  plop.setHelper("filenameWithoutExtension", helpers.filenameWithoutExtension);
  plop.setHelper("removeExtensionUnlessPHP", helpers.removeExtensionUnlessPHP);
  plop.setHelper("trimFirstDot", helpers.trimFirstDot);

  plop.setGenerator("controller", {
    description: "make a controller file",
    prompts: [
      prompts.template("default"),
      prompts.extension(".php"),
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
        data.path =
          basepath +
          "/{{filenameWithoutExtension template }}.{{trimFirstDot extension }}";
        data.options = A.flip(data.options);
      },
      {
        type: "add",
        path: "{{ path }}",
        templateFile: "controller{{removeExtensionUnlessPHP extension}}.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.path, "@PLOP_CURSOR");
      },
    ],
  });
};
