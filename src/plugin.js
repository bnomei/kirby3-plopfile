const A = require("./utils/a.js");
const choices = require("./utils/choices.js");
const F = require("./utils/f.js");
const helpers = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("plugins");

  plop.setHelper("toLowerCase", helpers.toLowerCase);
  plop.setHelper("toUpperCase", helpers.toUpperCase);
  plop.setHelper("ucfirst", helpers.ucfirst);

  let defaultOptions = [
    {
      name: "[index.php] declare strict types",
      value: "declareStrictTypes",
      checked: false,
    },
    {
      name: "[index.php] include composer autoloader",
      value: "includeComposerAutoloader",
      checked: false,
    },
    {
      name: "[index.php] add kirby autoloader example",
      value: "addClassLoader",
      checked: false,
    },
    {
      name: "[index.php] add class alias example",
      value: "addClassAlias",
      checked: false,
    },
    {
      name: "[composer.json] PSR-4 autoloader",
      value: "composerPsr4",
      checked: false,
    },
    // { name: '[composer.json] require getkirby/composer-installer', value: 'composerInstaller', checked: false},
    choices.none(),
    choices.defaults(),
    choices.all(),
  ];

  let defaultExtensions = [
    choices.authchallenge(false),
    choices.apidata(false),
    choices.apiroute(false),
    choices.blueprint(true),
    choices.cachetype(false),
    choices.collection(true),
    choices.collectionfilter(false),
    choices.collectionmethod(false),
    choices.controller(true),
    choices.field(true),
    choices.fieldmethod(true),
    choices.filemethod(true),
    choices.filesmethod(false),
    choices.hook(true),
    choices.kirbytag(true),
    choices.option(true),
    choices.pagemethod(true),
    choices.pagemodel(true),
    choices.pages(true),
    choices.pagesmethod(false),
    choices.permission(false),
    choices.route(true),
    choices.section(false),
    choices.sitemethod(true),
    choices.snippet(true),
    choices.template(true),
    choices.translation(false),
    choices.usermethod(false),
    choices.usermodel(false),
    choices.usersmethod(false),
    choices.validator(false),
    choices.none(),
    choices.defaults(),
    choices.all(),
  ];

  plop.setGenerator("plugin", {
    description: "make a plugin index.php and composer.json file",
    prompts: [
      {
        type: "input",
        name: "user",
        message: "Plugin created by user",
        default: "kirby",
      },
      {
        type: "input",
        name: "repository",
        message: "Plugin repository Id",
        default: "plugin",
      },
      {
        type: "input",
        name: "prefix",
        message: "Plugin repository prefix",
        default: "kirby3-",
      },
      {
        type: "checkbox",
        name: "options",
        message: "Options",
        choices: defaultOptions,
      },
      {
        type: "checkbox",
        name: "extensions",
        message: "Extensions",
        choices: defaultExtensions,
      },
      // TODO: confirm prompt: parcel package.js https://github.com/getkirby/pluginkit/blob/4-panel/package.json
      // TODO: confirm prompt: .gitignore https://github.com/getkirby/pluginkit/blob/4-panel/.gitignore & https://getkirby.com/docs/guide/plugins/plugin-setup-composer#support-for-plugin-installation-without-composer
      // TODO: confirm prompt: unittesting in phpunit.xml, dev-require, scripts, extras
    ],
    actions: [
      function (data) {
        data.prefix = data.prefix.replace(/\s/g, ""); // remove all spaces
        data.path = plop.renderString(
          basepath +
            "/{{toLowerCase prefix }}{{toLowerCase repository }}/index.php",
          data
        );
        data.options = choices.make(data.options, defaultOptions);
        data.extensions = choices.make(data.extensions, defaultExtensions);
        data.extensions.api =
          data.extensions.apidata != undefined ||
          data.extensions.apiroute != undefined;
      },
      {
        type: "add",
        path: "{{ path }}",
        templateFile: "plugin.index.php.hbs",
      },
      {
        type: "add",
        path:
          basepath +
          "/{{toLowerCase prefix }}{{toLowerCase repository }}/composer.json",
        templateFile: "plugin.composer.json.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.path);
      },
    ],
  });
};
