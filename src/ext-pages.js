const F = require("./utils/f.js");
const helper = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("plugins");
  const pattern = /^( *)(\/\/ @PLOP_EXT_PAGES)\r?\n/gim;

  plop.setHelper("camelize", helper.camelize);
  plop.setHelper("slugify", helper.slugify);
  plop.setHelper("toLowerCase", helper.toLowerCase);
  plop.setHelper("wrapValue", helper.wrapValue);

  plop.setGenerator("ext-pages", {
    description: "append pages code to a file",
    prompts: [prompts.folder(basepath),
    { type: 'input', name: 'title', message: 'Title' },
    prompts.template(),
    prompts.import(),
    ],
    actions: [
      function (data) {
        data = kirby.resolvePluginInclude(data, basepath);
        data.data = F.load(data.import);
      },
      {
        path: "{{ indexphp }}",
        type: "modify",
        pattern: pattern,
        templateFile: "ext-pages.php.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.indexphp, pattern);
      },
    ],
  });
};
