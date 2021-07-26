# Kirby3 Plopfile

![Release](https://flat.badgen.net/packagist/v/bnomei/kirby3-plopfile?color=ae81ff)
![Downloads](https://flat.badgen.net/packagist/dt/bnomei/kirby3-plopfile?color=272822)
[![Build Status](https://flat.badgen.net/travis/bnomei/kirby3-plopfile)](https://travis-ci.com/bnomei/kirby3-plopfile)
[![Coverage Status](https://flat.badgen.net/coveralls/c/github/bnomei/kirby3-plopfile)](https://coveralls.io/github/bnomei/kirby3-plopfile) 
[![Maintainability](https://flat.badgen.net/codeclimate/maintainability/bnomei/kirby3-plopfile)](https://codeclimate.com/github/bnomei/kirby3-plopfile) 
[![Twitter](https://flat.badgen.net/badge/twitter/bnomei?color=66d9ef)](https://twitter.com/bnomei)

CLI tool to generate various files for Kirby3 CMS using PLOP

## Commerical Usage

This plugin is free but if you use it in a commercial project please consider to 
- [make a donation 🍻](https://www.paypal.me/bnomei/5) or
- [buy me ☕](https://buymeacoff.ee/bnomei) or
- [buy a Kirby license using this affiliate link](https://a.paddle.com/v2/click/1129/35731?link=1170)

## Installation

- unzip [master.zip](https://github.com/bnomei/kirby3-plopfile/archive/master.zip) as folder `site/plugins/kirby3-plopfile` or
- `git submodule add https://github.com/bnomei/kirby3-plopfile.git site/plugins/kirby3-plopfile` or
- `composer require bnomei/kirby3-plopfile`

## Requirements

Install [Plop globally](https://plopjs.com). 

> Plop is simplified just glue code between [inquirer](https://github.com/SBoudrias/Inquirer.js/) prompts and [handlebar](https://github.com/wycats/handlebars.js/) templates.

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
plop blueprint pages blogpost
plop template blogpost
plop content "Consistency made simple!" "blog/" blogpost
```

> INFO: The plugin will `glob` to find the locations of your [Kirby roots](https://getkirby.com/docs/guide/configuration#custom-folder-setup) automatically. 

## Generators

- blueprint
- config
- content
- controller
- htaccess
- indexphp
- model
- plugin
- robotstxt
- snippet
- template
- user

## Extending the plopfile

You can add custom [inquirer](https://github.com/SBoudrias/Inquirer.js/) code to your new plopfile as inline code or using `load`.

```js
module.exports = function (plop) {
    plop.load([
        'site/plugins/kirby3-plopfile/plopfile.js'
        // add your custom files here...
    ]);
    // or any plop code here
};
```

## Major dependencies

- [plop.js](https://github.com/plopjs/plop)
- [inquirer.js](https://github.com/SBoudrias/Inquirer.js)
- [handlebars.js](https://github.com/handlebars-lang/handlebars.js)
- [fast-glob](https://github.com/mrmlnc/fast-glob)

## Disclaimer

This plugin is provided "as is" with no guarantee. Use it at your own risk and always test it yourself before using it in a production environment. If you find any issues, please [create a new issue](https://github.com/bnomei/kirby3-plopfile/issues/new).

## License

[MIT](https://opensource.org/licenses/MIT)

It is discouraged to use this plugin in any project that promotes racism, sexism, homophobia, animal abuse, violence or any other form of hate speech.
