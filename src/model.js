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

  let defaultChoices = [
    choices.declareStrictTypes(false),
    choices.none(),
    choices.defaults(),
    choices.all(),
  ];

  plop.setGenerator("model", {
    description: "make a model file",
    prompts: [
      prompts.folder(basepath),
      prompts.template(),
      {
        type: "checkbox",
        name: "options",
        message: "Options",
        choices: defaultChoices,
      },
    ],
    actions: [
      function (data) {
        data.folder = F.findFolder(kirby.autopath(data.folder, basepath));
        // add root if adding to plugins
        let root = "/" + (process.env["PLOP_ROOT_MODELS"] ?? "models");
        if (!data.folder.endsWith(root)) {
          data.folder = data.folder + root;
        }
        data.path = kirby.autopath(
          plop.renderString(
            "{{trimTrailingSlash folder }}/{{filenameWithoutExtension template }}.php",
            data
          ),
          basepath
        );
        data.options = choices.make(data.options, defaultChoices);
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
