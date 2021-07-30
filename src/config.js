const F = require("./utils/f.js");
const helpers = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("config");

  plop.setHelper("filenameWithoutExtension", helpers.filenameWithoutExtension);
  plop.setHelper("wrapValue", helpers.wrapValue);

  plop.setGenerator("config", {
    description: "make a config file",
    prompts: [
      {
        type: "input",
        name: "filename",
        message: "Filename",
        default: "config",
      },
      prompts.import(),
    ],
    actions: [
      function (data) {
        data.path = basepath + "/{{filenameWithoutExtension filename }}.php";
        data.data = F.load(data.import);
        return data.data;
      },
      {
        type: "add",
        path: "{{ path }}",
        templateFile: "config.php.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.path, "@PLOP_CURSOR");
      },
    ],
  });
};
