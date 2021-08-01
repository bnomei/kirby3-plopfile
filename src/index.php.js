const F = require("./utils/f.js");
const helpers = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");
const setups = require("./utils/setups.js");

module.exports = function (plop) {
  const basepath = kirby.root("index");

  plop.setHelper("trimTrailingSlash", helpers.trimTrailingSlash);

  plop.setGenerator("indexphp", {
    description: "make a index.php file",
    prompts: [prompts.folder(basepath), prompts.setups(setups.all())],
    actions: [
      function (data) {
        data.path = kirby.autopath(
          plop.renderString(
            "{{#if folder}}{{trimTrailingSlash folder }}{{else}}" +
              basepath +
              "{{/if}}/index.php",
            data
          ),
          basepath
        );
      },
      {
        type: "add",
        path: "{{ path }}",
        templateFile: "index.{{ setup }}.php.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.path, "@PLOP_CURSOR");
      },
    ],
  });
};
