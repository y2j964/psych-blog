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
* Netlify CMS
* Webpack
* NodeJS
* Axios
* Git and Git Bash
* Tailwind CSS 1.0.4
* PostCSS

## Features
* Statically build site for SEO
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
Runs webpack server.

#### `npm run dev:eleventy`
Watches eleventy files (.hbs in this case) and builds on save.

#### `npm run dev:server`
 "npm-run-all -p dev:webpack-server dev:eleventy",
Sets up the webpack server and the eleventy watch in parallel.

#### `npm run dev`
Runs all dev scripts in parallel. This is your main development script.

### Production
Here are the production scripts:

#### `npm run build:webpack`
Runs webpack in production mode and builds assets.

#### `npm run build:eleventy`
Builds static resources.

#### `npm run build:deploy`
Deploys build directory to gh-pages

#### `npm run build`
Runs all production scripts in parallel. This is your main production script.

## Acknowledgements
* The Spinner gif was generated with [loading.io](https://loading.io/).
* The favicon was generated with [favicon.io](https://favicon.io/).
