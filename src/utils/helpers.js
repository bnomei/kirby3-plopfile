const slugify = require("./slugify");

module.exports.wrapValue = function (value) {
  if (typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  if (value === "true" || value === "false") {
    return value;
  }
  if (value === undefined || value === null || value === "null") {
    return "null";
  }
  if (typeof value === "string" && value.startsWith("function")) {
    return value;
  }
  return "'" + value + "'";
};

module.exports.filenameWithoutExtension = function (text) {
  return text ? text.toLowerCase().replace(".php", "").replace(".yml", "") : "";
};

module.exports.appendPHPExtensionIfMissing = function (text) {
  return text ? (text.endsWith(".php") === false ? text + ".php" : text) : "";
};

module.exports.trimFirstDot = function (text) {
  return text ? text.replace(/^\./, "") : "";
};

module.exports.commaSpace = function (text) {
  return text ? text.replace(",", ", ").replace("  ", " ") : "";
};

module.exports.slugify = function (text) {
  return text ? slugify.parse(text) : "";
};

module.exports.trimLeadingSlash = function (text) {
  return text ? text.replace(/^\//, "") : "";
};

module.exports.trimTrailingSlash = function (text) {
  return text ? text.replace(/\/$/, "") : "";
};

module.exports.toLowerCase = function (text) {
  return text ? text.toLowerCase() : "";
};

module.exports.toUpperCase = function (text) {
  return text ? text.toLowerCase() : "";
};

module.exports.ucfirst = function (text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
};

module.exports.removeExtensionUnlessPHP = function (text) {
  return text ? (text == ".php" ? ".php" : "") : ""; // match exactly for better blade/twig support
};

module.exports.camelize = function (text) {
  if (text === undefined) return "";
  // https://stackoverflow.com/a/2970667
  text = text.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
  return text.charAt(0).toUpperCase() + text.slice(1);
};

module.exports.randomString = function (length) {
  // https://attacomsian.com/blog/javascript-generate-random-string
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
};
