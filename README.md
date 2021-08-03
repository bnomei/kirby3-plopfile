# Kirby3 Plopfile

![Release](https://flat.badgen.net/packagist/v/bnomei/kirby3-plopfile?color=ae81ff)
![Downloads](https://flat.badgen.net/packagist/dt/bnomei/kirby3-plopfile?color=272822)
[![Twitter](https://flat.badgen.net/badge/twitter/bnomei?color=66d9ef)](https://twitter.com/bnomei)

Plopfile to generate various files for Kirby3 CMS using Plop.js

## What others (might have) said about this Plugin

> 🤩<br>
> <small>_- K-nerd_</small>

> Using generators is faster than grabbing and adjusting code from the officals docs? Really? Awesome!<br>
> <small>_- Lasi Toiper_</small>

> Finally a Kirby CLI on ploperoids with a gazzilion of appending generators.<br>
> <small>_- p10pa_</small>

> I don't care how it works but it does!<br>
> <small>_- NewToThis_</small>

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
# $ = kirbys default root for that generator
plop blueprint $ pages blogpost
plop template $ blogpost
plop content "Consistency made simple!" blog blogpost
plop snippet $ slideshow

# adding inline code to plugins
plop plugin myname myplugin
plop ext-collection myplugin allBlogpages

# some files need to be referenced in the plugin index.php to work
plop blueprint myplugin pages contactform
plop ext-blueprint myplugin contactform
plop template myplugin contactform
plop ext-template myplugin contactform
plop ext-route myplugin form/submit '' POST
```

## Generators (52)

-   [x] blueprint (folder, type, template, extension, import)
-   [x] config-option (file, key, value)
-   [x] config-hook (file, key, todo)
-   [x] config-route (file, pattern, method, todo, [language, ])
-   [x] config (filename, extensions, import)
-   [x] content (title, parent, template, import, [language, slug,])
-   [x] controller (folder, template, extension, options)
-   [x] dockercompose (folder, type, [...])
-   [x] ext-auth-challenge (folder, key, value)
-   [x] ext-api-data (folder, key, params, todo)
-   [x] ext-api-route (folder, params, pattern, method, todo)
-   [x] ext-blueprint (folder, file)
-   [x] ext-cache-type (folder, key, value)
-   [x] ext-class-alias (folder, key, value)
-   [x] ext-class-loader (folder, key, value)
-   [x] ext-collection-filter (folder, key, todo)
-   [x] ext-collection-method (folder, key, params, todo)
-   [x] ext-collection (folder, key, params, todo)
-   [x] ext-controller (folder, file)
-   [x] ext-field-method (folder, key, params, todo)
-   [x] ext-field (folder, key, todo)
-   [x] ext-file-method (folder, key, params, todo)
-   [x] ext-files-method (folder, key, params, todo)
-   [x] ext-hook (folder, hook, todo)
-   [x] ext-kirbytag (folder, key, attr, params, todo)
-   [x] ext-option (folder, key, value)
-   [x] ext-page-method (folder, key, params, todo)
-   [x] ext-page-model (folder, key, value)
-   [x] ext-pages-method (folder, key, params, todo)
-   [x] ext-pages (folder, title, template, import)
-   [x] ext-permission (folder, key, value)
-   [x] ext-route (folder, pattern, method, params, todo, [language, ])
-   [x] ext-section (folder, key, todo)
-   [x] ext-site-method (folder, key, params, todo)
-   [x] ext-snippet (folder, file)
-   [x] ext-template (folder, file)
-   [x] ext-user-method (folder, key, params, todo)
-   [x] ext-user-model (folder, key, value)
-   [x] ext-users-method (folder, key, params, todo)
-   [x] ext-validator (folder, key, todo)
-   [x] file (file, parent, template, import, [language,])
-   [x] htaccess (folder, type)
-   [x] indexphp (folder, type)
-   [x] language (code, default, direction, locale, name, url, import)
-   [x] model (folder, template, options)
-   [x] plugin (user, repository, prefix, options)
-   [x] robotstxt (folder)
-   [x] setup (setup)
-   [x] snippet (folder, filename, options, import)
-   [x] tdd (folder)
-   [x] template (folder, template, extension, options)
-   [x] user (email, name, password, role, language)

## Roadmap (1)

-   [ ] ext-translation

> Please [create a new issue](https://github.com/bnomei/kirby3-plopfile/issues/new) if you want to suggest an idea or discuss existing generators.

## Bypassing

-   Strings with whitespace need to wrapped in single quotes or double quotes.
-   `import` can be a json string, relative or absolute path to a json or yml file. Bypassed json strings need to be wrapped in single quotes.
-   `_` let you skip bypassing a prompt.
-   `$` can be used on `folder` prompts to default to kirbys root. The plugin will `glob` to find the locations of your [Kirby roots](https://getkirby.com/docs/guide/configuration#custom-folder-setup) automatically, but the folders must exist.
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
```

**content with known parent and template but prompt for title**

```bash
plop content _ blog default {}
```

**blueprint cloning**

```bash
plop blueprint $ fields cd .yml
plop blueprint $ fields dvd .yml cd.yml
```

**config with options from escaped json string**

```bash
plop config config.staging defaults '{"debug": true, "home": "staging" }'
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
plop plugin myname myplugin '' defaults defaults
```

**create blueprint in plugin and "extend" the plugin index.php**

```bash
plop blueprint myplugin pages merch .yml {}
plop ext-blueprint myplugin pages/merch
```


**snippet at /site/snippets with isset check for each key with fallback**

```bash
plop snippet $ topnav defaults '{ "title": "title fallback", "isOpen": null }'
```

**create snippet in plugin folder and then register it as an extension to that plugin**

```bash
plop snippet myplugin slideshow defaults {}
plop ext-snippet myplugin slideshow
```

**template for laravel blade rendering**

```bash
plop template $ booking .blade.php defaults
```

**hook in plugin with todo comment**

```bash
plop ext-hook myplugin page.changeStatus:after "if a blogpost is published make kirby send an email to client"
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

## New Projects

Kirby offers various installation methods (zip, coomposer, composer project). Here is a new one.

### generator-based composer project for public-storage setup

**in your project root**
```bash
composer init
jq -r '. + { config: { "optimize-autoloader": true } }' composer.json
composer require php:">=7.3.0 <8.1.0" getkirby/cms:^3.5 bnomei/kirby3-plopfile:^1.0
cp site/plugins/kirby3-plopfile/example.plopfile.js plopfile.js

plop setup public-storage
plop indexphp public public-storage
plop htaccess
plop robotstxt
plop tdd
```

## Existing Projects

### Usage of `config-` and `ext-` with existing files or when missing markers

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
        "./site/plugins/kirby3-plopfile/plopfile.js",
        // add your custom files here...
    ]);
    // or any plop code here
};
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
