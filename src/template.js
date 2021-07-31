const A = require("./utils/a.js");
const choices = require("./utils/choices.js");
const F = require("./utils/f.js");
const helpers = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("templates");

  plop.setHelper("filenameWithoutExtension", helpers.filenameWithoutExtension);
  plop.setHelper("trimFirstDot", helpers.trimFirstDot);
  plop.setHelper("trimTrailingSlash", helpers.trimTrailingSlash);
  plop.setHelper("removeExtensionUnlessPHP", helpers.removeExtensionUnlessPHP);

  let defaultChoices = [
    choices.declareStrictTypes(),
    choices.typeHintCoreObjects(),
    choices.none(),
    choices.defaults(),
    choices.all(),
  ];
  plop.setGenerator("template", {
    description: "make a template file",
    prompts: [
      prompts.folder(basepath),
      prompts.template(""),
      prompts.extension(".php"),
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
        let root = "/" + (process.env["PLOP_ROOT_TEMPLATES"] ?? "templates");
        if (!data.folder.endsWith(root)) {
          data.folder = data.folder + root;
        }
        data.path = kirby.autopath(
          plop.renderString(
            "{{trimTrailingSlash folder}}/{{filenameWithoutExtension template }}.{{trimFirstDot extension }}",
            data
          ),
          basepath
        );
        data.options = choices.make(data.options, defaultChoices);
      },
      {
        type: "add",
        path: "{{ path }}",
        templateFile: "template{{removeExtensionUnlessPHP extension}}.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.path, "@PLOP_CURSOR");
      },
    ],
  });
};
