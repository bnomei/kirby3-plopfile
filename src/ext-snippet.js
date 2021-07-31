const F = require("./utils/f.js");
const path = require("path");
const fs = require("fs");
const helper = require("./utils/helpers.js");
const kirby = require("./utils/kirby.js");
const prompts = require("./utils/prompts.js");

module.exports = function (plop) {
  const basepath = kirby.root("index");

  plop.setGenerator("ext-snippet", {
    description: "append snippet include to an index.php",
    prompts: [prompts.folder(basepath), prompts.file()],
    actions: [
      function (data) {
        data.folder = F.findFolder(kirby.autopath(data.folder, basepath));
        data.indexphp = data.folder + "/index.php";
        data.file = fs.existsSync(data.file)
          ? data.file
          : F.findFile(path.basename(data.file) + "*", data.folder + "/"); // the snippet
        // data.file = F.findFile( data.file + "*", data.folder + "/"); // the snippet
        data.key = path
          .basename(data.file, path.extname(data.file))
          .toLowerCase();
        data.include = data.file.replace(data.folder, "");
      },
      {
        path: "{{ indexphp }}",
        type: "modify",
        pattern: /^( *)(\/\/ @PLOP_EXT_SNIPPET)\r?\n/gim,
        templateFile: "ext-snippet.php.hbs",
      },
      function (data) {
        return F.clipboard(plop, data.indexphp, "@PLOP_EXT_SNIPPET");
      },
    ],
  });
};
