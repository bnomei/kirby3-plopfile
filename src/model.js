const A = require("./utils/a.js");
const choices = require("./utils/choices.js");
const F = require("./utils/f.js");
const helpers = require("./utils/helpers.js");
const prompts = require("./utils/prompts.js");
const kirby = require("./utils/kirby.js");

module.exports = function (plop) {
  const basepath = kirby.root("models");

  plop.setHelper("camelize", helpers.camelize);
  plop.setHelper("filenameWithoutExtension", helpers.filenameWithoutExtension);
  plop.setHelper("trimTrailingSlash", helpers.trimTrailingSlash);
  plop.setHelper("ucfirst", helpers.ucfirst);

  plop.setGenerator("model", {
    description: "make a model file",
    prompts: [
      prompts.folder(basepath),
      prompts.template(),
      {
        type: "checkbox",
        name: "options",
        message: "Options",
        choices: [choices.declareStrictTypes(false)],
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
        templateFile: "model.php.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.path, "@PLOP_CURSOR");
      },
    ],
  });
};
