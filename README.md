# Kirby3 Plopfile

![Release](https://flat.badgen.net/packagist/v/bnomei/kirby3-plopfile?color=ae81ff)
![Downloads](https://flat.badgen.net/packagist/dt/bnomei/kirby3-plopfile?color=272822)
[![Twitter](https://flat.badgen.net/badge/twitter/bnomei?color=66d9ef)](https://twitter.com/bnomei)

Plopfile to generate various files for Kirby3 CMS using Plop.js

## What others (might have) said about this Plugin

> 🤩
> _- K-nerd_

> Never have I created files for Kirby faster. They just plop into my project! Sweet.
> _- Lasi Toiper_

> Finally a Kirby CLI on **plop**eroids with a gazzilion of appending generators.
> _- p10pa_

> I don't care how it works but it does!
> _- NewToThis_

## Commerical Usage

This plugin is free but if you use it in a commercial project please consider to

-   [make a donation 🍻🍻🍻](https://www.paypal.me/bnomei/15) or
-   [buy me ☕☕☕](https://buymeacoff.ee/bnomei) or
-   [buy a Kirby license using this affiliate link](https://a.paddle.com/v2/click/1129/35731?link=1170)

## Installation

-   unzip [master.zip](https://github.com/bnomei/kirby3-plopfile/archive/master.zip) as folder `site/plugins/kirby3-plopfile` or
-   `git submodule add https://github.com/bnomei/kirby3-plopfile.git site/plugins/kirby3-plopfile` or
-   `composer require bnomei/kirby3-plopfile`

## Requirements

Install [Plop.js globally](https://plopjs.com).

> Plop.js is simplified just glue code between [inquirer](https://github.com/SBoudrias/Inquirer.js/) prompts and [handlebar](https://github.com/wycats/handlebars.js/) templates.

```bash
npm install -g plop
```

or

```bash
yarn global add plop
```

## Setup

Copy `example.plopfile.js` from the plugin directory to your project root.

```bash
cp site/plugins/kirby3-plopfile/example.plopfile.js plopfile.js
```

## Use Plop to generate files

```bash
plop
```

Or trigger a generator and [bypass some prompts](https://plopjs.com/documentation/#cli-usage) but being prompted for missing ones interactivly.

```bash
plop blueprint $ pages blogpost
plop template $ blogpost
plop content "Consistency made simple!" blog blogpost
```

> INFO: The plugin will `glob` to find the locations of your [Kirby roots](https://getkirby.com/docs/guide/configuration#custom-folder-setup) automatically.

## Generators

-   [x] blueprint (folder, type, template, extension, import)
-   [x] config-option (file, key, value)
-   [x] config-hook (file, key, todo)
-   [x] config-route (file, pattern, method, [language, ] todo)
-   [x] config (filename, extensions, import)
-   [x] content (title, parent, template, [language, slug,] import)
-   [x] controller (folder, template, extension, options)
-   [x] dockercompose (folder, type, [...])
-   [x] ext-auth-challenge (folder, key, value)
-   [x] ext-api-data (folder, key, params, todo)
-   [x] ext-api-route (folder, params, pattern, method, todo)
-   [x] ext-blueprint (folder, file)
-   [x] ext-cache-type (folder, key, value)
-   [x] ext-collection-filter (folder, key, params, todo)
-   [x] ext-collection-method (folder, key, params, todo)
-   [x] ext-collection (folder, key, params, value, todo)
-   [x] ext-controller (folder, file)
-   [x] ext-field-method (folder, key, params, todo)
-   [x] ext-field (folder, key, todo)
-   [x] ext-file-method (folder, key, params, todo)
-   [x] ext-files-method (folder, key, params, todo)
-   [x] ext-hook (folder, key, todo)
-   [x] ext-kirbytag (folder, key, attr, params, todo)
-   [x] ext-option (folder, key, value)
-   [x] ext-page-method (folder, key, params, todo)
-   [x] ext-page-model (folder, key, value)
-   [x] ext-pages-method (folder, key, params, todo)
-   [x] ext-pages (folder, title, template, import)
-   [ ] ext-permission
-   [x] ext-route (folder, pattern, method, params, [language, ] todo)
-   [ ] ext-section
-   [ ] ext-site-method
-   [x] ext-snippet
-   [ ] ext-template
-   [ ] ext-translation
-   [ ] ext-user-method
-   [ ] ext-user-model
-   [ ] ext-users-method
-   [ ] ext-validator
-   [x] file (file, parent, template, [language,] import)
-   [x] htaccess (folder, type)
-   [x] indexphp (folder, type)
-   [x] language (code, default, direction, locale, name, url, import)
-   [x] model (folder, template, options)
-   [x] plugin (user, repository, prefix, options)
-   [x] robotstxt (folder)
-   [x] setup (setup)
-   [x] snippet (folder, filename, options, import)
-   [x] template (folder, template, extension, options)
-   [x] user (email, name, password, role, language)

## Roadmap

> Please [create a new issue](https://github.com/bnomei/kirby3-plopfile/issues/new) if you want to suggest an idea or discuss existing generators.

## Bypassing

-   Strings with whitespace need to wrapped in single quotes or double quotes.
-   `import` can be a json string, relative or absolute path to a json or yml file. Bypassed json strings need to be wrapped in single quotes.
-   `$` can be used on `folder` prompts to default to kirbys root.
-   `none`/`defaults`/`all` can be used on `options` and `extensions` to select checkboxes when bypassing.
-   `y`/`n` can be used on confirmation prompts.
-   `file` and `folder` will be globbed and support wildcards. So you could write `*mydo*` instead of writing `config.www.mydomain.net.php`.

> ⚠️ If you use plop to generate files but set generator `extensions` to `none` or cherry pick them manually you might be missing some markers. I'd recommend to stick to `default` or `all` as values for these when bypassing or just press `enter` (aka default) when using the interactive dialog. You can always add the markers manually later.

## Examples

**start interactive generator**

```bash
plop
```

**start blueprint generator directly**

```bash
plop blueprint
```

**blueprint with bypassed prompts (values forwarded from command line)**

```bash
plop blueprint $ pages article .yml {}
plop blueprint --folder $ --type pages --template article --extension .yml --import {}
```

> `_`/`--` let you skip bypassing a prompt.

**content with known parent and template but prompt for title**

```bash
plop content _ blog default {}
```

**blueprint cloning**

```bash
plop blueprint $ fields dvd .yml cd.yml
```

**config with options from escaped json string**

```bash
plop config config.staging '{"debug": true, "home": "staging", "ready": "function() { return ["my.option" => kirby()->root("index") . "/resources"]; }"}'
```

**content with fields from json/yml file**

```bash
plop content "Consistency, made easy!" blog default n123.json
```

**file with template and sorting number**

```bash
plop file imgs/i456.jpg blog/consitency-made-easy hero '{"sort": 4}'
```

**language with translations from json/yml file**

```bash
plop language de n ltr de_DE Deutsch de trans_de.yml
```

**plugin to add project specific extensions**

```bash
plop plugin myname projectxyz '' defaults
```

**create blueprint in plugin and "extend" the plugin index.php**

```bash
plop blueprint projectxyz pages merch
plop ext-blueprint projectxyz pages/merch
```


**snippet at /site/snippets with isset check for each key with fallback**

```bash
plop snippet $ topnav defaults '{ "title": "title fallback", "isOpen": null }'
```

**create snippet in plugin folder and then register it as an extension to that plugin**

```bash
plop snippet projectxyz slideshow
plop ext-snippet projectxyz slideshow
```

**template for laravel blade rendering**

```bash
plop template $ booking .blade.php defaults
```

## Usage of `config-` and `ext-` with existing files or when missing markers

When creating files with `plop config` or `plop plugin` the generator will add markers to identify the location to append extensions. To make `config-` and `ext-` generators work with files not created by plop you have to manually add these strings to the respective files. They adher to the following pattern:

```
[language specific comment] @PLOP_EXT_[extension name in uppercase, singular and low-dashes]
```

**example for PHP files**
```php
// @PLOP_EXT_HOOK
// @PLOP_EXT_FILES_METHOD
```

**example site/config/config.php**
```php
<?php

return [
    'hooks' => [
        // Do not forget adding a `,` after existing array items
        'page.update:after' => function () { },
        // @PLOP_EXT_HOOK
    ],
];
```

## Extending the plopfile

You can add custom code to your new plopfile as inline code or using files with `plop.load()`.

**plopfile.js**

```js
module.exports = function (plop) {
    plop.load([
        "site/plugins/kirby3-plopfile/plopfile.js",
        // add your custom files here...
    ]);
    // or any plop code here
};
```

## .env File

### clipboard

```
# Code.exe' on Windows, 'code' on OSX
PLOP_CLIPBOARD="Code.exe {{filepath}}:{{line}}:{{char}}"

# Sublime Text on OSX
PLOP_CLIPBOARD="subl {{filepath}}:{{line}}:{{char}}"

# disable copying to clipboard at end of generator
PLOP_CLIPBOARD=false
```

### kirby roots

If you renamed a root the generator will not find it unless you set it in your .env file.

```
# PLOP_ROOT_[uppercase version of original root name]
PLOP_ROOT_TEMPLATES="different"
# instead of "templates"
```

## Major dependencies

-   [plop.js](https://github.com/plopjs/plop)
-   [inquirer.js](https://github.com/SBoudrias/Inquirer.js)
-   [handlebars.js](https://github.com/handlebars-lang/handlebars.js)
-   [fast-glob](https://github.com/mrmlnc/fast-glob)
-   [js-yaml](https://github.com/nodeca/js-yaml)
-   [clipboardy](https://github.com/sindresorhus/clipboardy)

All non-dev node_module dependencies are included since Kirby CMS Plugins are supposed to work just by downloading the repository zip and without requiring any further build step.

## Disclaimer

This plugin is provided "as is" with no guarantee. Use it at your own risk and always test it yourself before using it in a production environment. If you find any issues, please [create a new issue](https://github.com/bnomei/kirby3-plopfile/issues/new).

## License

[MIT](https://opensource.org/licenses/MIT)

It is discouraged to use this plugin in any project that promotes racism, sexism, homophobia, animal abuse, violence or any other form of hate speech.
