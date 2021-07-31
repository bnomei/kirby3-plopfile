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
  plop.setHelper("wrapValue", helpers.wrapValue);

  plop.setGenerator("snippet", {
    description: "make a snippet file",
    prompts: [
      prompts.folder(basepath),
      prompts.file(),
      {
        type: "checkbox",
        name: "options",
        message: "Options",
        choices: [
          choices.declareStrictTypes(false),
          choices.typeHintCoreObjects(false),
        ],
      },
      prompts.import(),
    ],
    actions: [
      function (data) {
        data.folder = F.findFolder(kirby.autopath(data.folder, basepath));
        // add root if adding to plugins
        let root = "/" + (process.env["PLOP_ROOT_SNIPPETS"] ?? "snippets");
        if (!data.folder.endsWith(root)) {
          data.folder = data.folder + root;
        }
        data.data = F.load(data.import);
        data.path = kirby.autopath(
          plop.renderString(
            "{{trimTrailingSlash folder }}/{{filenameWithoutExtension file }}.php",
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
