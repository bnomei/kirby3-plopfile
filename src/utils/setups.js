module.exports.all = function () {
  return [
    {
      name: "default",
      value: "default",
      files: [
        "content/site.txt",
        "content/home/home.txt",
        "content/error/error.txt",
        "media/index.html",
        "site/accounts.html",
        "site/blueprints/site.yml",
        "site/blueprints/pages/default.yml",
        "site/cache/index.html",
        "site/sessions/index.html",
        "site/snippets/index.html",
        "site/templates/default.php",
        "site/logs/index.html",
        // plop folders
        "site/config/index.html",
        "site/controllers/index.html",
        "site/languages/index.html",
        "site/models/index.html",
        "site/plugins/index.html",
      ],
    },
    {
      name: "public folder for index and storage for persistent files",
      value: "public-storage",
      files: [
        "storage/index.html",
        "storage/content/site.txt",
        "storage/content/home/home.txt",
        "storage/content/error/error.txt",
        "storage/media/index.html",
        "storage/accounts/index.html",
        "site/blueprints/site.yml",
        "site/blueprints/pages/default.yml",
        "storage/cache/index.html",
        "storage/sessions/index.html",
        "site/snippets/index.html",
        "site/templates/default.php",
        "storage/logs/index.html",
        // plop folders
        "public/.gitkeep",
        "site/config/index.html",
        "site/controllers/index.html",
        "site/languages/index.html",
        "site/models/index.html",
        "site/plugins/index.html",
      ],
    },
  ];
};

module.exports.find = function (key) {
  let search = undefined;
  this.all().forEach(function (value, index, arr) {
    if (value.value == key) {
      search = arr[index];
    }
  });
  return search;
};
