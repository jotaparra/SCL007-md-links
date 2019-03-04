#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
var marked = require("marked");
const fetch = require("node-fetch");

const mdLinks = (ruta, options) => {
  let verify = fs.statSync(ruta);

  let absolutPath = path.resolve(ruta);
  const extname = path.extname(absolutPath);
  //=> es la lista de argumentos que se le entregó al programa. El primero ya corresponde a "posicion 0 -> la dirección de node" "posicion 1 -> el archivo que está ejecutandose"
  if (extname == ".md") {
    const markdown = fs.readFileSync(absolutPath).toString();
    const links = markdownLinkExtractor(markdown); //markdownLinkExtractor => parametros (Texto en formato markdown) devolcuiones(un array que contiene las URL de los enlaces encontrados).
    const arrayFetch = [];
    for (let i = 0; i < links.length; i++) {
      const text = links[i].text;
      const url = links[i];
      const fetchEachLink = fetch(links[i]) // guardamos todas las promesas[i] en una variable
        .then(res => {
          //si la promesa es resuelta se ejecuta la función que le pasamos.
          if (options === "--validate") {
            let objectLinks = {
              links: res.url,
              text: text,
              ruta: absolutPath,
              statusLink: res.status,
              statusText: res.statusText
            };
            return objectLinks;
          } // por qué lo retorno acá?
          else {
            let objectLinks = {
              links: res.url,
              text: text,
              ruta: absolutPath
            };
            return objectLinks;
          }
        })
        .catch(err => {
          const objectFail = { urlLink: url, statusLink: "Fail" };
          return objectFail; //por qué lo retorno acá?
        });
      arrayFetch.push(fetchEachLink); //ahora colocamos todas las promesas que estaban guardadas en fetchEachLinks en el arreglo vacio que teniamos
    }
    Promise.all(arrayFetch).then(arrRes => {
      //Hacemos solo UNA PROMESA que contenga el array de promesas.
      console.log(arrRes);
    });
  } else if (verify.isDirectory() === true) {
    let recursive = fs.readdirSync(ruta);
    return Promise.all(
      recursive.map(element => {
        let joined = path.join(ruta, element);
        return mdLinks(joined);
      })
    );
  } else {
    console.log("No es un archivo markdown");
  }
};

module.exports = mdLinks;


//---------------------------


  function markdownLinkExtractor(markdown) {
  var links = [];

  var renderer = new marked.Renderer();

  // Taken from https://github.com/markedjs/marked/issues/1279
  var linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

  renderer.link = function(href, title, text) {
    links.push({ href: href, title: title, text: text });
  };
  renderer.image = function(href, title, text) {
    // Remove image size at the end, e.g. ' =20%x50'
    href = href.replace(/ =\d*%?x\d*%?$/, "");
    links.push({ href: href, title: title, text: text });
  };
  marked(markdown, { renderer: renderer });

  return links;
};