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
