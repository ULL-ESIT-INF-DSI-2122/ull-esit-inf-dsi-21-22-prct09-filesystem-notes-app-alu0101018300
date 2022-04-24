# Practica 9
## Aplicación de procesamiento de notas de texto

En esta práctica, se tendrá que implementar una aplicación de procesamiento de notas de texto. En concreto, la misma permitirá añadir, modificar, eliminar, listar y leer notas de un usuario concreto. Las notas se almacenarán como ficheros JSON en el sistema de ficheros de la máquina que ejecute la aplicación. Además, solo se podrá interactuar con la aplicación desde la línea de comandos.

### Desarrollo de la práctica

Cabe destacar, que las notas, van a estar compuesta por cuatro elementos diferentes: 

- Título
- Propietario
- Contenido
- Color

### Interfaz 

En primer lugar, se ha realizado una interfaz que contiene la cabecera de las funciones que serán obligatorias para la gestión de las 
notas dado por el mismo enunciado, estas son añadir, leer, listar, eliminar y editar notas. Por tanto la interfaz quedara de la 
siguiente manera:

``` typescript

``` 

Como se puede ver, estas a partir de alguno o todos los elementos mencionados al principio serán capaces de realizar operaciones.
Además retornarán un booleano, esto es así para poder realizar las pruebas de una manera más sencilla, en sí mismas, estas funciones
no tendrían por qué retornar nada.

### Clase NoteManagement

Esta va a ser la clase que contendrá las operaciones que se van a realizar con las notas. Es por esto que su constructor va a estar 
vacío, aunque contiene un atributo path, el cual contendrá la ruta donde se va a almacenar esa nota. Además se pueden distinguir dos
tipos de métodos, los privados, que son los que van a usar los métodos que necesitamos para el correcto funcionamiento de la gestión, 
y los públicos, que son los que realizan las operaciones en sí mismas.




