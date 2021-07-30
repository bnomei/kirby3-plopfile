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
        data.path =
          "{{#if folder}}{{ folder }}{{else}}" +
          basepath +
          "{{/if}}/robots.txt";
      },
      {
        type: "add",
        path: "{{ path }}",
        templateFile: "robots.txt.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.path, "@PLOP_CURSOR");
      },
      function () {
        return "[SUGGESTS] https://github.com/bnomei/kirby3-robots-txt";
      },
    ],
  });
};
