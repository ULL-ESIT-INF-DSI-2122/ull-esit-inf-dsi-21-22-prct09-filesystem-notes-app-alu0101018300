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
export interface noteManagement {
  addNote(user: string, title: string, body: string, color: string): boolean;
  readNote(user: string, title: string): boolean;
  editNote(user: string, title: string, body: string, color: string): boolean;
  removeNote(user: string, title: string): boolean;
  listNotes(user: string): boolean
}
``` 

Como se puede ver, estas a partir de alguno o todos los elementos mencionados al principio serán capaces de realizar operaciones.
Además retornarán un booleano, esto es así para poder realizar las pruebas de una manera más sencilla, en sí mismas, estas funciones
no tendrían por qué retornar nada.

### Clase NoteManagement

Esta va a ser la clase que contendrá las operaciones que se van a realizar con las notas. Es por esto que su constructor va a estar 
vacío, aunque contiene un atributo path, el cual contendrá la ruta donde se va a almacenar esa nota. Además se pueden distinguir dos
tipos de métodos, los privados, que son los que van a usar los métodos que necesitamos para el correcto funcionamiento de la gestión, 
y los públicos, que son los que realizan las operaciones en sí mismas.

#### Métodos private
##### EstablishPath()

``` typescript
private establishPath(user: string): void {
    this._path = `/home/usuario/Practicas/Practica9/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101018300/notes/${user}`;
  }
```
Método encargado de cambiar el atributo path, para dejarlo preparado para usarlo para el resto de los métodos que van a hacer
uso del mismo.

##### AddFolder()

``` typescript
private addFolder(): void {
    if (!fs.existsSync(this._path)) {
      fs.mkdirSync(this._path);
    }
  }
``` 

Función, que mediante el sistema de ficheros, comprueba la existencia de un directorio, para que, si este no existe
cree uno nuevo a partir de el atributo path.

##### TravelNotes()

``` typescript
private travelNotes(path: string) {
    const note = JSON.parse(fs.readFileSync(path, 'utf8'));
    return note;
  }
```

Método que se encarga de retornar la información almacenada en los JSON, es decir, en una nota de un directorio
en concreto, concretamente el que está almacenado en el atributo path.

##### Print()

``` typescript
private print(color: string, body:string) {
    if (color === 'red') {
      console.log(chalk.red(body));
    } 
    else if (color === 'green') {
      console.log(chalk.green(body));
    }
     else if (color === 'blue') {
      console.log(chalk.blue(body));
    } 
    else if (color === 'yellow') {
      console.log(chalk.yellow(body));
    }
    else {
      console.log(body);
      console.log(chalk.red.inverse(`${color} is not available`));
    }
  }
```

Función encargada, de imprimir un string en un color en concreto, esto es posible gracias a las funcionalidades proporcionadas
por chalk. En este caso, como dice el enunciado solo estarían disponibles esos colores, por lo que si no es uno de estos imprimirá
en el color por defecto y mostrará un mensaje de error diciendo que el color no está dispobible.

#### Métodos Public

Todos estos métodos tienen una estructura similar, esto es, realizan las comprobaciones pertinentes mediante el sistema de ficheros,
para posteriormente ejecutar la acción deseada. Aquí ya se hace uso de las "propiedades" mencionadas al comienzo del informe.

##### AddNote()

``` typescript
  public addNote(user: string, title: string, body: string, color: string): boolean {
    this.establishPath(user);
    this.addFolder();
    const filepath = `${this._path}/${title}.json`;
    if (!fs.existsSync(filepath)) {
      fs.writeFileSync(this._path + '/' + title + '.json', JSON.stringify({
        title: title,
        body: body,
        color: color,
      }));
      console.log(chalk.green(`New Note Added.`));
      return true;
    } else {
      console.log(chalk.red.inverse(`The Note Already Exists.`));
      return false;
    }
  }
``` 

Esta es la función de añadie una nueva nota. En primer lugar, setteará y comprobará la existencia de un directorio para 
este usuario, para si todo ha salido bien, posteriormente crear un fichero JSON con los atributos correspondientes pasados
como parámetros a la función. Finalmente mostrará en el color correspondiente el resultado del proceso.

##### ReadNote()

``` typescript
public readNote(user: string, title: string): boolean {
    this.establishPath(user);
    const notePath:string = this._path + '/' + title + '.json';
    if (fs.existsSync(notePath)) {
      const note = this.travelNotes(notePath);
      const body = note.body;
      const color = note.color;
      console.log(chalk.green(`Note ${note.title}: `));
      this.print(color, body);
      return true;
    } 
    else {
      console.log(chalk.red.inverse('This note does NOT exist.'));
      return false;
    }
  }
```

Esta función, se encarga de leer una nota, es decir, de mostrar el contenido por pantalla. Por tanto, primero comprobará
la existencia de la misma, para posteriormente, imprimirla con la función print explicada anteriormente.

##### EditNote()

``` typescript
  public editNote(user: string, title: string, body: string, color: string): boolean {
    this.establishPath(user);
    if (fs.existsSync(this._path + '/' + title + '.json')) {
      const note = this.travelNotes(this._path + '/' + title + '.json');
      note.body = body;
      note.color = color;
      fs.writeFileSync(this._path + '/' + title + '.json', JSON.stringify(note));
      console.log(chalk.green(`Edition Completed`));
      return true;
    } else {
      console.log(chalk.red.inverse('This note does NOT exist.'));
      return false;
    }
  }
```

Esta función es la encargada de modificar el contenido de una nota ya existente. Así que, primero comprueba la existencia
de la nota como en el caso anterior, para posteriormente, si esta existe, cambiar el contenido por el string body y color
pasados como parámetros del método. También muestra los mensajes en los colores correspondientes, en función de como haya
resultado el desarrollo de la función.




