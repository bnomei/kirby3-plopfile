const Kirby = require("./helpers/kirby.js");
const F = require("./helpers/f.js");
const A = require("./helpers/a.js");

module.exports = function (plop) {
  plop.setHelper("saveFilename", function (text) {
    return text.toLowerCase().replace(".php", "");
  });
  plop.setHelper("ucfirst", function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  });
  plop.setHelper("camelize", function (text) {
    // https://stackoverflow.com/a/2970667
    text = text.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
    return text.charAt(0).toUpperCase() + text.slice(1);
  });

  var basepath = Kirby.root("models");

  plop.setGenerator("model", {
    description: "make a model file",
    prompts: [
      {
        type: "input",
        name: "template",
        message: "Template",
      },
      {
        type: "checkbox",
        name: "options",
        message: "Options",
        choices: [
          {
            name: "declare strict types",
            value: "declareStrictTypes",
            checked: false,
          },
        ],
      },
    ],
    actions: [
      function (data) {
        data.options = A.flip(data.options);
      },
      {
        type: "add",
        path: basepath + "/{{saveFilename template }}.php",
        templateFile: "model.php.hbs",
      },
      function (data) {
        let path = plop.renderString(
          basepath + "/{{saveFilename template }}.php",
          data
        );
        return F.clipboard(plop, path, "@PLOP_CURSOR");
      },
    ],
  });
};
