module.exports = () => {
  // ...
};

/* const math = require('./math.js') //  ./ es para que sepa que está dentro de la misma carpeta. y lo voy a guardar dentro de una constante
console.log(math);

/* console.log(math.substract(1,2));
console.log(math.multiply(2,1));
console.log(math.divide(5,0));
console.log(math.add(1,2));
console.log(math.divide(2,1)); */

/* const os = require('os'); //estoy importando un módulo que viene en node
console.log(os.platform()); //ej. para saber en que plataforma estoy trabajando //win32
console.log(os.release());
console.log('free memory: ', os.freemem(), 'bytes');
console.log('total memory: ', os.totalmem(), 'bytes');    */

const fs = require('fs');
const path = require('path');
/* fs.writeFile('./texto.txt', 'linea uno', function (err) {  //function = callback
    if (err) {
        console.log(err);
    }
    console.log('archivo creado');
})

console.log('última linea de código'); //cuando ejecutamos el código primero veremos 'ultima linea de código' y después 'archivo creado', ya que primero se crea el archivo que es trabajo del sistema operativo, pero mientras esto ocurre, JS se sigue ejecutando línea  a línea.
 */

/* fs.readFile('./texto.txt', function(err, data){
    if (err){
        console.log(err);
    }
    console.log(data.toString());
}) */

/* let ruta = "./texto.txt";

fs.lstat(ruta, (err, stats) => {

    if(err)
        return console.log(err); //Handle error

    console.log(`Is file: ${stats.isFile()}`);
    console.log(`Is directory: ${stats.isDirectory()}`);
    console.log(`Is symbolic link: ${stats.isSymbolicLink()}`);
    console.log(`Is FIFO: ${stats.isFIFO()}`);
    console.log(`Is socket: ${stats.isSocket()}`);
    console.log(`Is character device: ${stats.isCharacterDevice()}`);
    console.log(`Is block device: ${stats.isBlockDevice()}`);
}); */

//extrae la extensión de un archivo
path.extname('texto.txt');
console.log(path.extname('texto.txt'));


//Lee los contenidos de un directorio y devuelve 
fs.readdir(commandToAdd1, (err, files) => {
    if (err){ console.log(err)
    }