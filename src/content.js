const Kirby = require("./helpers/kirby.js");
const Slugify = require("./helpers/slugify.js");
const F = require("./helpers/f.js");

module.exports = function (plop) {
  plop.setHelper("slugify", function (text) {
    return Slugify.parse(text);
  });
  plop.setHelper("trimTrailingSlash", function (text) {
    return text.replace(/\/$/, "");
  });
  plop.setHelper("toLowerCase", function (text) {
    return text.toLowerCase();
  });
  plop.setHelper("ucfirst", function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  });

  let basepath = Kirby.root("content");

  let prompts = [
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
    {
      type: "input",
      name: "template",
      message: "Template",
      default: "default",
    },
  ];

  const existingLanguages = Kirby.languages();
  if (existingLanguages.length) {
    prompts.push({
      type: "list",
      name: "language",
      message: "Language",
      choices: existingLanguages,
    });
    prompts.push({
      type: "input",
      name: "slug",
      message: "Language specific slug (optional)",
    });
  }

  prompts.push({
    type: "input",
    name: "import",
    message: "Import data from json string, json or yml file (optional)",
    default: "{}",
  });

  plop.setGenerator("content", {
    description: "make a content file",
    prompts: prompts,
    actions: [
      function (data) {
        data.data = F.load(data.import);
        return data.data;
      },
      {
        type: "add",
        path:
          basepath +
          "/{{trimTrailingSlash parent }}/{{slugify title }}/{{toLowerCase template }}{{#if language}}.{{ language }}{{/if}}.txt",
        templateFile: "content.txt.hbs",
      },
      function (data) {
        let path = plop.renderString(
          basepath +
            "/{{trimTrailingSlash parent }}/{{slugify title }}/{{toLowerCase template }}{{#if language}}.{{ language }}{{/if}}.txt",
          data
        );
        return F.clipboard(plop, path, "@PLOP_CURSOR");
      },
    ],
  });
};
