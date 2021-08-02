const fs = require("fs");
const F = require("./utils/f.js");
const helpers = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");
const setups = require("./utils/setups.js");

module.exports = function (plop) {
  const basepath = kirby.root("base");

  plop.setGenerator("setup", {
    description: "create default files and folders (plainkit)",
    prompts: [prompts.setups(setups.all())],
    actions: function (data) {
      data.useComposer = fs.existsSync(basepath + "/composer.json");
      data.useNodeJS = fs.existsSync(basepath + "/package.json");

      let actions = [];
      setups.find(data.setup).files.forEach(function (value, index, arr) {
        actions.push({
          type: "add",
          path: basepath + "/" + value,
          templateFile: "setup.hbs",
        });
      });
      actions.push({
        type: "add",
        path: basepath + "/.editorconfig",
        templateFile: "setup.editorconfig.hbs",
      });
      actions.push({
        type: "add",
        path: basepath + "/.gitignore",
        templateFile: "setup.gitignore.enhanced.hbs",
      });

      return actions;
    },
  });
};
