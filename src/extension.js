const Kirby = require("./helpers/kirby.js");
const F = require("./helpers/f.js");
const E_pagemethod = require("extension.pagemethod.js");
const E_option = require("extension.option.js");

module.exports = function (plop) {
  let basepath = Kirby.root("index");
  let actions = {
    pagemethod: E_pagemethod.actions,
    option: E_option.actions,
  };

  plop.setGenerator("extension", {
    description: "add plugin extension code to an existing file",
    prompts: [
      {
        type: "input",
        name: "file",
        message: "File",
        default: basepath + "/",
      },
      {
        type: "list",
        name: "type",
        message: "Type",
        choices: ["option", "pagemethod"],
      },
      ...E_pagemethod.prompts,
      ...E_option.prompts,
    ],
    actions: [
      function (data) {
        data.file = F.findFile(data.file);
        actions[data.type].forEach((element) => {
          element(plop, data);
        });
      },
      function (data) {
        return F.clipboard(plop, data.file, "@PLOP_CURSOR");
      },
    ],
  });
};
