#!/usr/bin/env node

module.exports = () => {
  // ...
};
const fs = require("fs");
const path = require("path");
const markdownLinkExtractor = require("markdown-link-extractor");
const fetch = require("node-fetch");
/* let ruta = 'README.md'; 
    path.extname(ruta);
    console.log(path.extname(ruta)); */
/* mdLinks("./some/example.md")
.then(link => {
      // => [{ href, text, file }]
})
.catch(console.error); */

const ruta = process.argv[2];

//=> es la lista de argumentos que se le entregó al programa. El primero ya corresponde a "posicion 0 -> la dirección de node" "posicion 1 -> el archivo que está ejecutandose"
var markdown = fs.readFileSync(ruta).toString();
var links = markdownLinkExtractor(markdown);
const arrayFetch = []; //markdownLinkExtractor => parametros (Texto en formato markdown) devolcuiones(un array que contiene las URL de los enlaces encontrados).
for (let i = 0; i < links.length; i++) {
  const url = links[i];
  const a = fetch(links[i])
    .then(res => {
      const objectLinks = {
        urlLink: `${res.url}`,
        statusLink: `${res.status}`,
        statusText: `${res.statusText}`
      };
      console.log(objectLinks);
      return objectLinks;
    })
    .catch(err => {
      const objectFail = { urlLink: `${url}`, statusLink: "Fail" };
      return objectFail;
    });
  arrayFetch.push(a);
}
Promise.all(arrayFetch).then(arrRes => {
  console.log(arrRes);
});
