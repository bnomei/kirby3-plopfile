const F = require("./utils/f.js");
const helpers = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("index");

  plop.setHelper("trimTrailingSlash", helpers.trimTrailingSlash);

  plop.setGenerator("dockercompose", {
    description: "make a docker-compose.yml file",
    prompts: [
      prompts.folder(basepath),
      {
        type: "list",
        name: "type",
        message: "Type",
        choices: [
          {
            name: "starterkit (https://getkirby.com/docs/cookbook/setup/kirby-meets-docker)",
            value: "starterkit",
          },
          { name: "webdevops", value: "webdevops" },
        ],
      },
      {
        type: "input",
        name: "image",
        message: "Image",
        default: "webdevops/php-apache:7.4",
        when: (data) => data.type === "webdevops",
      },
      {
        type: "input",
        name: "root",
        message: "WEB_DOCUMENT_ROOT",
        default: "/app",
        when: (data) => data.type === "webdevops",
      },
      {
        type: "input",
        name: "alias",
        message: "WEB_ALIAS_DOMAIN",
        default: "localhost",
        when: (data) => data.type === "webdevops",
      },
    ],
    actions: [
      function (data) {
        data.path =
          "{{#if folder}}{{trimTrailingSlash folder }}{{else}}" +
          basepath +
          "{{/if}}/docker-compose.yml";
      },
      {
        type: "add",
        path: "{{ path }}",
        templateFile: "docker-compose.{{ type }}.yml.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.path, "@PLOP_CURSOR");
      },
    ],
  });
};
