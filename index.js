module.exports = () => {
  // ...
};
const fs = require('fs');
const path = require('path');
const markdownLinkExtractor = require('markdown-link-extractor'); 

/* let ruta = 'README.md'; 
    path.extname(ruta);
    console.log(path.extname(ruta)); */


/* mdLinks("./some/example.md")
.then(link => {
      // => [{ href, text, file }]
})
.catch(console.error); */


const ruta = process.argv[2]; //=> es la lista de argumentos que se le entregó al programa. El primero ya corresponde a "posicion 0 -> la dirección de node" "posicion 1 -> el archivo que está ejecutandose"
var markdown = fs.readFileSync(ruta).toString();
var links = markdownLinkExtractor(markdown);
links.forEach(function (link) {
console.log(link);
    });

