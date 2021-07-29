const Kirby = require("./helpers/kirby.js");
const F = require("./helpers/f.js");

module.exports = function (plop) {
  plop.setHelper("saveFoldername", function (text) {
    return text.replace(".htaccess", "").replace(/\/$/, ""); // trim trailing slash
  });

  var basepath = Kirby.root("index");

  plop.setGenerator("htaccess", {
    description: "make htaccess file",
    prompts: [
      {
        type: "input",
        name: "folder",
        message: "Folder (optional)",
        default: basepath,
      },
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
      {
        type: "add",
        path:
          "{{#if folder}}{{saveFoldername folder }}{{else}}" +
          basepath +
          "{{/if}}/.htaccess",
        templateFile: "htaccess.{{ type }}.hbs",
      },
      function (data) {
        let path = plop.renderString(
          "{{#if folder}}{{saveFoldername folder }}{{else}}" +
            basepath +
            "{{/if}}/.htaccess",
          data
        );
        return F.clipboard(plop, path, "@PLOP_CURSOR");
      },
    ],
  });
};
