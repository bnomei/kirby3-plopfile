const bcrypt = require("bcrypt");
const fg = require("fast-glob");
const fs = require("fs");
const path = require("path");
const F = require("./f.js");
const helper = require("./helpers.js");

module.exports.createUserId = function (length) {
  return helper.randomString(length);
};

module.exports.encryptPassword = function (password) {
  // https://attacomsian.com/blog/nodejs-password-hashing-with-bcrypt
  // https://stackoverflow.com/a/27341808
  // https://www.npmjs.com/package/bcrypt
  return bcrypt
    .hashSync(password, bcrypt.genSaltSync(10))
    .replace(/^\$2a(.+)$/i, "$2y$1")
    .replace(/^\$2b(.+)$/i, "$2y$1");
};

module.exports.autopath = function (path, basepath) {
  return path.replace("$", basepath).replace("//", "/");
};

module.exports.resolvePluginInclude = function (
  data,
  basepath,
  root = undefined
) {
  if (data.folder) {
    data.folder = F.findFolder(this.autopath(data.folder, basepath));
    data.indexphp = data.folder + "/index.php";
  } else {
    data.folder = basepath;
  }
  if (data.file) {
    if (!fs.existsSync(data.file)) {
      data.file = F.findFile(path.basename(data.file) + "*", data.folder); // the snippet
    }
    data.basenameWithoutExtension = path
      .basename(data.file, path.extname(data.file))
      .toLowerCase();
    data.relativePath = helper.trimLeadingSlash(
      data.file.replace(data.folder, "")
    );
    data.relativePathWithoutExtensionAndRoot = data.relativePath.replace(
      path.extname(data.file),
      ""
    );
    if (root) {
      root = process.env["PLOP_ROOT_" + root.toUpperCase()] ?? root;
      data.relativePathWithoutExtensionAndRoot =
        data.relativePathWithoutExtensionAndRoot.replace(
          root.toLowerCase() + "/",
          ""
        );
    }
  }
  return data;
};

module.exports.root = function (root) {
  if (root == "user" || root == "users") root = "accounts";
  root = process.env["PLOP_ROOT_" + root.toUpperCase()] ?? root;
  if (root == "index" || root == "base") {
    const indexphp = fg.sync(["**/index.php"], {
      onlyFiles: true,
      absolute: true,
      deep: 2,
    });
    if (indexphp.length && root == "index") return indexphp[0].replace("/index.php", "");
    if (indexphp.length && root == "base") return indexphp[0].replace("/index.php", "").replace("/public","");
  } else {
    const folder = fg.sync(["**/" + root], {
      onlyDirectories: true,
      absolute: true,
    });
    if (folder.length) return folder[0];
  }
  throw new Error("Root '" + root + "' not found. Does the folder exist?");
  return "./";
};

module.exports.languages = function () {
  return fg
    .sync(["**/languages/??.php"], { onlyFiles: true, objectMode: true })
    .map(function (file) {
      return file.name.replace(".php", "");
    });
};

module.exports.blueprintTypes = function () {
  // merge without duplicates
  let types = [
    "fields",
    "files",
    "layouts",
    "pages",
    "sections",
    "users",
  ].concat(
    fg
      .sync(["**/blueprints/*"], { onlyDirectories: true, objectMode: true })
      .map(function (folder) {
        return folder.name;
      })
  );
  return types
    .filter((item, index) => {
      return types.indexOf(item) == index;
    })
    .sort();
};

module.exports.userRoles = function () {
  let roles = fg
    .sync(["**/blueprints/users/*.yml"], { onlyFiles: true, objectMode: true })
    .map(function (file) {
      return file.name.replace(".yml", "");
    });
  if (roles.indexOf("admin") == -1) roles.push("admin");
  return roles.sort();
};
