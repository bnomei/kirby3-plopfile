require("dotenv").config();

module.exports = function (plop) {
  plop.load([
    "./src/blueprint.js",
    "./src/config.js",
    "./src/content.js",
    "./src/controller.js",
    "./src/docker-compose.js",
    //'./src/extension.js',
    "./src/file.js",
    "./src/htaccess.js",
    "./src/index.php.js",
    "./src/language.js",
    //'./src/laravelmix.js',
    "./src/model.js",
    "./src/plugin.js",
    "./src/robots.txt.js",
    //'./src/setup.js',
    "./src/snippet.js",
    "./src/template.js",
    //'./src/user.js',
  ]);
};
