module.exports.prompts = [
  {
    type: "input",
    name: "title",
    message: "Title",
    when: (data) => data.type === "pagemethod",
  },
  {
    type: "input",
    name: "template",
    message: "Template",
    default: "default",
    when: (data) => data.type === "pagemethod",
  },
];

module.exports.actions = [
  function (plop, data) {
    console.log(data);
  },
];
