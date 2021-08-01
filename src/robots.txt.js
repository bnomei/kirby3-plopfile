const F = require("./utils/f.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("index");

  plop.setGenerator("robotstxt", {
    description: "make a robots.txt file",
    prompts: [prompts.folder(basepath)],
    actions: [
      function (data) {
        data.path = kirby.autopath(
          plop.renderString(
            "{{#if folder}}{{ folder }}{{else}}" +
              basepath +
              "{{/if}}/robots.txt",
            data
          ),
          basepath
        );
      },
      {
        type: "add",
        path: "{{ path }}",
        templateFile: "robots.txt.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.path);
      },
      function () {
        return "[SUGGESTS] https://github.com/bnomei/kirby3-robots-txt";
      },
    ],
  });
};
