#!/usr/bin/env node

module.exports = () => {
  // ...
};
const fs = require('fs');
const path = require('path');
const markdownLinkExtractor = require('markdown-link-extractor'); 
const fetch = require('node-fetch');
/* let ruta = 'README.md'; 
    path.extname(ruta);
    console.log(path.extname(ruta)); */
/* mdLinks("./some/example.md")
.then(link => {
      // => [{ href, text, file }]
})
.catch(console.error); */
const mdLinks = ()=>{
const ruta = process.argv[2]; 

//=> es la lista de argumentos que se le entregó al programa. El primero ya corresponde a "posicion 0 -> la dirección de node" "posicion 1 -> el archivo que está ejecutandose"
var markdown = fs.readFileSync(ruta).toString();
var links = markdownLinkExtractor(markdown); //markdownLinkExtractor => parametros (Texto en formato markdown) devolcuiones(un array que contiene las URL de los enlaces encontrados).
for(let i =0; i< links.length; i++){
   fetch (links[i])
   .then((res) =>{
    const objectLinks = {urlLink:`${res.url}`, statusLink:`${res.status}`, statusText:`${res.statusText}`}
    console.log(objectLinks); 
})
   .catch(err => console.error(links[i] + "Link roto"));
}}


module.exports = {mdLinks};