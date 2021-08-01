const F = require("./utils/f.js");
const helpers = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("index");

  plop.setHelper("trimTrailingSlash", helpers.trimTrailingSlash);

  plop.setGenerator("htaccess", {
    description: "make htaccess file",
    prompts: [
      prompts.folder(basepath),
      {
        type: "list",
        name: "type",
        message: "Type",
        choices: [
          { name: "default (revision 2020-06-15)", value: "starterkit" },
          { name: "html5-boilerplate htaccess + default", value: "h5bp" },
        ],
      },
    ],
    actions: [
      function (data) {
        data.path = kirby.autopath(
          plop.renderString(
            "{{#if folder}}{{trimTrailingSlash folder }}{{else}}" +
              basepath +
              "{{/if}}/.htaccess",
            data
          ),
          basepath
        );
      },
      {
        type: "add",
        path: "{{ path }}",
        templateFile: "htaccess.{{ type }}.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.path);
      },
    ],
  });
};
