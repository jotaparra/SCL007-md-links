# Proyecto Markdown Links 🚀

Librería que lee y analiza archivos en formato Markdown(.md)para verificar los links que contengan.


## Instalación 🔧

Para utilizar esta librería como requisito debes tener instalado previamente NodeJs en tu computador.

Luego debes ejecutar el siguiente comando en la terminal:

`npm install https://github.com/jotaparra/SCL007-md-links`


## CLI (Command Line Interface - Interfaz de Línea de Comando) 📌

Esta aplicación puede ejecutarse a través de la terminal de la siguiente manera:

`md-links <path-to-file> [option]`

```sh
$ md-links ./some/example.md
```

##### Valor de retorno

Retorna promesa con un arreglo de objetos, donde cada objeto representa un link y contiene las siguientes propiedades:

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link.
- `file`: Ruta del archivo donde se encontró el link.


#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo realiza una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

### Autor: Jennifer Parra
