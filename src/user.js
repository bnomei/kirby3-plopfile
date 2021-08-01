const kirby = require("./utils/kirby.js");
const slugify = require("./utils/slugify.js");
const F = require("./utils/f.js");

module.exports = function (plop) {
  plop.setHelper("encryptPassword", function (text) {
    return kirby.encryptPassword(text);
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
        data.userid = kirby.createUserId(8);
        data.folder = basepath + "/" + data.userid;
        data.path = data.folder + "/index.php";
      },
      {
        type: "add",
        path: "{{ path }}",
        templateFile: "user.index.php.hbs",
      },
      {
        type: "add",
        path: "{{ folder }}/.htpasswd",
        templateFile: "user.htpasswd.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.path);
      },
    ],
  });
};
