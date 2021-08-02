const F = require("./utils/f.js");
const helpers = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");
const yaml = require("js-yaml");

module.exports = function (plop) {
  const basepath = kirby.root("blueprints");

  plop.setHelper("filenameWithoutExtension", helpers.filenameWithoutExtension);
  plop.setHelper("trimFirstDot", helpers.trimFirstDot);
  plop.setHelper("trimTrailingSlash", helpers.trimTrailingSlash);

  plop.setGenerator("blueprint", {
    description: "make a blueprint file",
    prompts: [
      prompts.folder(basepath),
      {
        type: "list",
        name: "type",
        choices: kirby.blueprintTypes(),
      },
      prompts.template(),
      prompts.extension(".yml"),
      prompts.import(),
    ],
    actions: [
      function (data) {
        const fo = kirby.autopath(data.folder, basepath);
        data.folder = F.findFolder(fo);
        if (data.folder == undefined) {
          throw new Error("Folder '" + fo + "' was not found");
        }
        // add root if adding to plugins
        let root = "/" + (process.env["PLOP_ROOT_BLUEPRINTS"] ?? "blueprints");
        if (!data.folder.endsWith(root)) {
          data.folder = data.folder + root;
        }
        F.makeDir(data.folder);
        data.path = kirby.autopath(
          plop.renderString(
            "{{trimTrailingSlash folder }}/{{ type }}/{{filenameWithoutExtension template }}.{{trimFirstDot extension }}",
            data
          ),
          basepath
        );
        data.data = F.load(data.import);
        data.yaml =
          data.data && Object.keys(data.data).length
            ? yaml.dump(data.data)
            : undefined;
        return data.data;
      },
      {
        type: "add",
        path: "{{ path }}",
        templateFile: "blueprint.{{trimFirstDot extension }}.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.path);
      },
    ],
  });
};
