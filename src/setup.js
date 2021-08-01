const F = require("./utils/f.js");
const helpers = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");
const setups = require("./utils/setups.js");

module.exports = function (plop) {
  const basepath = kirby.root("index");

  plop.setGenerator("setup", {
    description: "create default files and folders (plainkit)",
    prompts: [prompts.setups(setups.all())],
    actions: function (data) {
      let actions = [];
      setups.find(data.setup).files.forEach(function (value, index, arr) {
        actions.push({
          type: "add",
          path: basepath + "/" + value,
          templateFile: "setup.hbs",
        });
      });
      return actions;
    },
  });
};
