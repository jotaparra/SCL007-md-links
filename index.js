#!/usr/bin/env node
const mdLinks = require('./mdlinks.js');
const ruta = process.argv[2];


if(require.main === module)
    mdLinks(ruta);