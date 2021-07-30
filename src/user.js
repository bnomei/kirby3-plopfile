const kirby = require("./utils/kirby.js");
const slugify = require("./utils/slugify.js");

module.exports = function (plop) {
  plop.setHelper("userIdFrom", function (text) {
    return slugify.parse(text); // TODO
  });
  plop.setHelper("encryptPassword", function (text) {
    return text; // TODO
  });

  const basepath = kirby.root("users");

  plop.setGenerator("user", {
    description: "make a user",
    prompts: [
      {
        type: "input",
        name: "email",
        message: "Email",
      },
      {
        type: "input",
        name: "name",
        message: "Name",
      },
      {
        type: "password",
        name: "password",
        message: "Password",
      },
      {
        type: "list",
        name: "role",
        message: "Role",
        choices: kirby.userRoles(),
      },
      {
        type: "input",
        name: "language",
        message: "Panel Language",
        default: "en",
      },
    ],
    actions: [
      function (data) {
        data.folder = basepath + "/{{userIdFrom email }}";
        data.path = kirby.autopath(
          basepath + "/{{userIdFrom email }}/index.php",
          basepath
        );
      },
      {
        type: "add",
        path: "{{ folder }}/index.php",
        templateFile: "user.index.php.hbs",
      },
      {
        type: "add",
        path: basepath + "/{{ folder }}/.htaccess",
        templateFile: "user.htaccess.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.path, "@PLOP_CURSOR");
      },
    ],
  });
};
