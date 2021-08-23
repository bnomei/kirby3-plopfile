const A = require("./a.js");

module.exports.make = function (arr, defaults) {
  if (arr.length == 1 && arr[0] == "none") {
    return [];
  }
  if (arr.length == 1 && arr[0] == "defaults") {
    arr = [];
    defaults.forEach(function (value, index, ar) {
      if (defaults[index].checked == true) {
        arr.push(defaults[index].value);
      }
    });
  }
  if (arr.length == 1 && arr[0] == "all") {
    arr = [];
    defaults.forEach(function (value, index, ar) {
      arr.push(defaults[index].value);
    });
  }
  // make it usable in handlebars
  let yup = [];
  arr.forEach(function (value, index, ar) {
    yup[value] = true;
  });

  return yup;
};

module.exports.none = function (checked = false) {
  return {
    name: "['none' to check none when bypassing]",
    value: "none",
    checked: checked,
  };
};

module.exports.defaults = function (checked = false) {
  return {
    name: "['defaults' to use defaults when bypassing]",
    value: "defaults",
    checked: checked,
  };
};

module.exports.all = function (checked = false) {
  return {
    name: "['all' to use all when bypassing]",
    value: "all",
    checked: checked,
  };
};

module.exports.declareStrictTypes = function (checked = false) {
  return {
    name: "declare strict types",
    value: "declareStrictTypes",
    checked: checked,
  };
};

module.exports.typeHintCoreObjects = function (checked = false) {
  return {
    name: "add type hints for $page, $site and $kirby",
    value: "typeHintCoreObjects",
    checked: checked,
  };
};

module.exports.authchallenge = function (checked = false) {
  return {
    name: "Auth Challenge",
    value: "authchallenge",
    checked: checked,
  };
};

module.exports.apidata = function (checked = false) {
  return {
    name: "Api Data",
    value: "apidata",
    checked: checked,
  };
};

module.exports.apiroute = function (checked = false) {
  return {
    name: "Api Routes",
    value: "apiroute",
    checked: checked,
  };
};

module.exports.blueprint = function (checked = false) {
  return {
    name: "Blueprints",
    value: "blueprint",
    checked: checked,
  };
};

module.exports.cachetype = function (checked = false) {
  return {
    name: "Cache Types (aka Drivers)",
    value: "cachetype", // yes. type not driver.
    checked: checked,
  };
};

module.exports.collection = function (checked = false) {
  return {
    name: "Collections",
    value: "collection",
    checked: checked,
  };
};

module.exports.collectionfilter = function (checked = false) {
  return {
    name: "Collection Filters",
    value: "collectionfilter",
    checked: checked,
  };
};

module.exports.collectionmethod = function (checked = false) {
  return {
    name: "Collection Methods",
    value: "collectionmethod",
    checked: checked,
  };
};

module.exports.controller = function (checked = false) {
  return {
    name: "Controllers",
    value: "controller",
    checked: checked,
  };
};

module.exports.field = function (checked = false) {
  return {
    name: "Field",
    value: "field",
    checked: checked,
  };
};

module.exports.fieldmethod = function (checked = false) {
  return {
    name: "Field Methods",
    value: "fieldmethod",
    checked: checked,
  };
};

module.exports.filemethod = function (checked = false) {
  return {
    name: "File Methods",
    value: "filemethod",
    checked: checked,
  };
};

module.exports.filesmethod = function (checked = false) {
  return {
    name: "Files Methods",
    value: "filesmethod",
    checked: checked,
  };
};

module.exports.hook = function (checked = false) {
  return {
    name: "Hooks",
    value: "hook",
    checked: checked,
  };
};

module.exports.kirbytag = function (checked = false) {
  return {
    name: "Kirby Tags",
    value: "kirbytag",
    checked: checked,
  };
};

module.exports.option = function (checked = false) {
  return {
    name: "Options",
    value: "option",
    checked: checked,
  };
};

module.exports.pagemethod = function (checked = false) {
  return {
    name: "Page Methods",
    value: "pagemethod",
    checked: checked,
  };
};

module.exports.pagemodel = function (checked = false) {
  return {
    name: "Page Models",
    value: "pagemodel",
    checked: checked,
  };
};

module.exports.pages = function (checked = false) {
  return {
    name: "Pages",
    value: "pages",
    checked: checked,
  };
};

module.exports.pagesmethod = function (checked = false) {
  return {
    name: "Pages Methods",
    value: "pagesmethod",
    checked: checked,
  };
};

module.exports.permission = function (checked = false) {
  return {
    name: "Permissions",
    value: "permission",
    checked: checked,
  };
};

module.exports.route = function (checked = false) {
  return {
    name: "Routes",
    value: "route",
    checked: checked,
  };
};

module.exports.section = function (checked = false) {
  return {
    name: "Sections",
    value: "section",
    checked: checked,
  };
};

module.exports.sitemethod = function (checked = false) {
  return {
    name: "Site Methods",
    value: "sitemethod",
    checked: checked,
  };
};

module.exports.snippet = function (checked = false) {
  return {
    name: "Snippets",
    value: "snippet",
    checked: checked,
  };
};

module.exports.template = function (checked = false) {
  return {
    name: "Templates",
    value: "template",
    checked: checked,
  };
};

module.exports.translation = function (checked = false) {
  return {
    name: "Translations",
    value: "translation",
    checked: checked,
  };
};

module.exports.usermethod = function (checked = false) {
  return {
    name: "User Methods",
    value: "usermethod",
    checked: checked,
  };
};

module.exports.usermodel = function (checked = false) {
  return {
    name: "User Models",
    value: "usermodel",
    checked: checked,
  };
};

module.exports.usersmethod = function (checked = false) {
  return {
    name: "Users Methods",
    value: "usersmethod",
    checked: checked,
  };
};

module.exports.validator = function (checked = false) {
  return {
    name: "Validators",
    value: "validator",
    checked: checked,
  };
};
