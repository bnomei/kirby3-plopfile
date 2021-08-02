const F = require("./utils/f.js");
const helpers = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("index");

  plop.setHelper("trimTrailingSlash", helpers.trimTrailingSlash);

  let choices = [
    {
      name: "php insights",
      value: "phpinsights",
      checked: true,
      package: "nunomaduro/phpinsights",
      files: [{ file: "tdd.phpinsights.php.hbs", path: "phpinsights.php" }],
    },
    {
      name: "php stan",
      value: "phpstan",
      checked: true,
      package: "phpstan/phpstan",
      files: [{ file: "tdd.phpstan.neon.hbs", path: "phpstan.neon" }],
    },
    {
      name: "php unit",
      value: "phpunit",
      checked: true,
      package: "phpunit/phpunit",
      files: [
        { file: "tdd.phpunit-bootstrap.php.hbs", path: "tests/bootstrap.php" },
        { file: "tdd.phpunit-test.php.hbs", path: "tests/ExampleTest.php" },
        { file: "tdd.phpunit.xml.hbs", path: "phpunit.xml" },
      ],
    },
  ];

  plop.setGenerator("tdd", {
    description: "setup various files for TDD in a public-storage folder setup",
    prompts: [
      prompts.folder(basepath),
      {
        type: "checkbox",
        name: "options",
        message: "Type",
        choices: choices,
      },
      {
        type: "list",
        name: "ide",
        message: "PHPInsights IDE",
        choices: [
          { name: "[none]", value: "" },
          "textmate",
          "macvim",
          "emacs",
          "sublime",
          "phpstorm",
          "atom",
          "vscode",
        ],
        when: (data) => data.options.join(",").indexOf("phpinsights") != -1,
      },
    ],
    actions: function (data) {
      data.path = kirby.autopath(
        plop.renderString(
          "{{#if folder}}{{trimTrailingSlash folder }}{{else}}" +
            basepath +
            "{{/if}}",
          data
        ),
        basepath
      );
      data.packages = [];
      data.files = [];

      choices.forEach(function (value, index, arr) {
        if (data.options.join(",").indexOf(value.value) != -1) {
          data.packages.push(value.package);
          value.files.forEach(function (v, i, a) {
            data.files.push(v);
          });
        }
      });
      console.log(data.files);
      let actions = [];
      data.files.forEach(function (value, index, arr) {
        actions.push({
          type: "add",
          path: basepath + "/" + value.path,
          templateFile: value.file,
        });
      });

      if (data.packages.length) {
        data.composer_require_dev =
          "composer require " + data.packages.join(" ") + " --dev";
        actions.push(
          F.clipboard(plop, data.composer_require_dev, undefined, false)
        );
      }

      return actions;
    },
  });
};
