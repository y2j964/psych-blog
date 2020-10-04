# Psych Blog
A psychology themed blog featuring the writing of Brandon Mooney.

ADD GIF HERE

## Table of contents
* [Demo](#Demo)
* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
* [Setup](#setup)
* [Acknowledgements](#acknowledgements)

## Demo
[Watch silent video demo]().

[Interact with demo]().

## General Info
This is a fullstack static web site built with Eleventy.js and Handlebars. The dashboard is handled via Netlify CMS.

## Technologies
* Eleventy.js
* Handlebars
* Markdown
* Netlify CMS
* Webpack
* Git and Git Bash
* Tailwind CSS 1.0.4
* PostCSS

## Features
* Statically built site for SEO boost
* Dynamic sitemap
* Markdown footnote support
* Footnote tooltips
* Netlify CMS for authors
* Hot module replacement for styles in dev environment
* ES6 support via babel
* Aria-supported

## Setup
This project has development scripts, production scripts, and miscellaneous scripts. This particular setup was heavily influenced by [PugSum](https://github.com/vktrwlt/pugsum).

### Dependencies
To get started, clone this repo, and run `npm install` to install dependencies.

### Miscellaneous
Here are the miscellaneous scripts:

#### `npm run clean`
Cleans the build directory.

### Development
Here are the development scripts:

#### `npm run dev:webpack`
Runs webpack in dev mode.

#### `npm run dev:webpack-server`
Runs webpack server. Here, webpack is watching js and css files.

#### `npm run dev:eleventy`
Watches eleventy files (.hbs in this case) and builds on save.

#### `npm run dev:server`
Sets up the webpack server and the eleventy watch in parallel.

#### `npm run dev`
Runs all dev scripts in parallel. This is your main development script.

### Production
Here are the production scripts:

#### `npm run build:webpack`
Runs webpack in production mode and builds assets.

#### `npm run build:eleventy`
Builds static resources.

#### `npm run build`
Runs all production scripts in parallel. This is your main production script. You don't need to call this directly. When you deploy from Netlify CMS, this build script gets triggered.

## Acknowledgements
* The footnote tooltip hover states were inspired by [Wikipedia](https://en.wikipedia.org/wiki/Main_Page).
* The Markdown footnotes were supported by [markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote).
* The application of markdown-it in the Netlify CMS custom preview was influenced by [this post by Guang Shi](https://www.guangshi.io/posts/customize-netlify-cms-preview/).
* The favicon was generated with [favicon.io](https://favicon.io/).
