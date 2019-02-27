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
let absolutPath=path.resolve(ruta);
const extname = path.extname(absolutPath);


const mdLinks = (file) => {
//=> es la lista de argumentos que se le entregó al programa. El primero ya corresponde a "posicion 0 -> la dirección de node" "posicion 1 -> el archivo que está ejecutandose"
if(extname == '.md'){
const markdown = fs.readFileSync(absolutPath).toString();
const links = markdownLinkExtractor(markdown);//markdownLinkExtractor => parametros (Texto en formato markdown) devolcuiones(un array que contiene las URL de los enlaces encontrados).
const arrayFetch = []; 
for (let i = 0; i < links.length; i++) {
  const text = links[i].text;
  const url = links[i];
  const fetchEachLink = fetch(links[i]) // guardamos todas las promesas[i] en una variable
    .then((res) => { //si la promesa es resuelta se ejecuta la función que le pasamos.
      const objectLinks = {
        urlLink: res.url, 
        text: text,
        statusLink: res.status,
        statusText: res.statusText
      };
      return objectLinks; // por qué lo retorno acá?
    })
    .catch((err) => {
      const objectFail = { urlLink: url, statusLink: "Fail" };
      return objectFail; //por qué lo retorno acá?
    });
  arrayFetch.push(fetchEachLink); //ahora colocamos todas las promesas que estaban guardadas en fetchEachLinks en el arreglo vacio que teniamos
}
Promise.all(arrayFetch).then(arrRes => {      //Hacemos solo UNA PROMESA que contenga el array de promesas.
  console.log(arrRes);
});
} else{console.log('No es un archivo markdown')
}
}
mdLinks(absolutPath)

