const F = require("./utils/f.js");
const helpers = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("content");

  plop.setHelper("slugify", helpers.slugify);
  plop.setHelper("toLowerCase", helpers.toLowerCase);
  plop.setHelper("trimTrailingSlash", helpers.trimTrailingSlash);
  plop.setHelper("ucfirst", helpers.ucfirst);

  let content_prompts = [
    {
      type: "input",
      name: "title",
      message: "Title",
    },
    {
      type: "input",
      name: "parent",
      message: "Enter UID of the parent folder",
      default: basepath + "/",
    },
    prompts.template("default"),
    prompts.import(),
  ];

  const existingLanguages = kirby.languages();
  if (existingLanguages.length) {
    content_prompts.push({
      type: "list",
      name: "language",
      message: "Language",
      choices: existingLanguages,
    });
    content_prompts.push({
      type: "input",
      name: "slug",
      message: "Language specific slug (optional)",
    });
  }

  plop.setGenerator("content", {
    description: "make a content file",
    prompts: content_prompts,
    actions: [
      function (data) {
        data.path = plop.renderString(
          basepath +
            "/{{trimTrailingSlash parent }}/{{slugify title }}/{{toLowerCase template }}{{#if language}}.{{ language }}{{/if}}.txt",
          data
        );
        data.data = F.load(data.import);
        return data.data;
      },
      {
        type: "add",
        path: "{{ path }}",
        templateFile: "content.txt.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.path);
      },
    ],
  });
};
