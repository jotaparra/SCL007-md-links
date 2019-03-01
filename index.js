#!/usr/bin/env node
const mdLinks = require('./mdlinks.js');
const ruta = process.argv[2];
const options = process.argv[3];


if(require.main === module)
    mdLinks(ruta, options);