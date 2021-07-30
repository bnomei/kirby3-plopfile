const F = require("./utils/f.js");
const fs = require("fs");
const helpers = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const path = require("path");
const prompts = require("./utils/prompts.js");
const slugify = require("./utils/slugify.js");

module.exports = function (plop) {
  const basepath = kirby.root("content");

  plop.setHelper("saveFilename", function (text) {
    let filename = path.basename(text);
    return filename
      .split(".")
      .map(function (part) {
        return slugify.parse(part);
      })
      .join(".");
  });
  plop.setHelper("trimTrailingSlash", helpers.trimTrailingSlash);
  plop.setHelper("toLowerCase", helpers.toLowerCase);
  plop.setHelper("ucfirst", helpers.toLowerCase);

  let file_prompts = [
    prompts.file(),
    {
      type: "input",
      name: "parent",
      message: "Enter UID of the parent folder",
      default: basepath + "/",
    },
    prompts.template(""),
  ];

  const existingLanguages = kirby.languages();
  if (existingLanguages.length) {
    file_prompts.push(prompts.language(existingLanguages));
  }

  file_prompts.push(prompts.import());

  plop.setGenerator("file", {
    description: "copy file to a content folder",
    prompts: file_prompts,
    actions: [
      function (data) {
        data.file = F.findFile(data.file);
        data.path = plop.renderString(
          basepath +
            "/{{trimTrailingSlash parent }}/{{saveFilename file }}{{#if language}}.{{ language }}{{/if}}.txt",
          data
        );
        data.data = F.load(data.import);
        return data.data;
      },
      {
        type: "add",
        path: "{{ path }}",
        templateFile: "file.txt.hbs",
      },
      function (data) {
        let source = F.findFile(data.file);
        let target = plop.renderString(
          basepath + "/{{trimTrailingSlash parent }}/{{saveFilename file }}",
          data
        );
        fs.copyFileSync(source, target);
        return source + " -> " + target;
      },
      function (data) {
        return F.clipboard(plop, data.path, "@PLOP_CURSOR");
      },
    ],
  });
};
