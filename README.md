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

##### RemoveNote()

``` typescript
  public removeNote(user: string, title: string): boolean {
    this.establishPath(user);
    if (fs.existsSync(this._path + '/' + title + '.json')) {
      fs.unlinkSync(this._path + '/' + title + '.json');
      console.log(chalk.green(`Deletion completed.`));
      return true;
    } else {
      console.log(chalk.red.inverse('This note does NOT exist.'));
      return false;
    }
  }
```

Esta función es la encargada de eliminar una nota, por lo que en primer lugar, comprueba la existencia de la misma, para
posteriormente, si esta exixte, eliminarla con la función predeterminada de fs. Finalmente, mostrará un mensaje en función
de como se haya producido la ejecución con el color correspondiente.

##### ListNote()

``` typescript
  public listNotes(user: string): boolean {
    this.establishPath(user);
    if (fs.existsSync(this._path)) {
      const notesCreated = fs.readdirSync(this._path);
      if (notesCreated.length > 0) {
        console.log(chalk.green('The notes are listed below: '));
        for (let i:number = 0; i < notesCreated.length; i++) {
          const note = this.travelNotes(this._path + '/' + notesCreated[i]);
          const title = note.title;
          const color = note.color;
          this.print(color, title);
        }
        return true;
      } 
      else {
        console.log(chalk.red('This User has NOT got notes'));
        return false;
      }
    } else {
      console.log(chalk.red(`User does NOT exists yet`));
      return false;
    }
  }
  ```
  
  Esta función es la encargada de mostrar todas las notas de un usuario, por lo que primero comprobará la existencia del 
  directorio de ese usuario. Posteriormente comprobará la cantidad de notas que hay, si no encuentra ninguna lo comunicará,
  si hay más, imprimirá los títulos de las notas en el color correspondiente. También mostrará mensajes de su correcto o 
  mal funcionamiento.
  
  ### Index
  
  En este fichero, se almacenarán los procesos para la ejecución del programa, todos tendrán una estructura similar. Básicamente,
  se hará uso de yargs, el cual permite que el programa se ejecute desde la línea de comandos. Los comandos serán los métodos 
  Public mencionados anteriormente, pasandole como opción los parámetros que son necesarios para la función. Por ejemplo:
  
  #### Comando Add
  
  ``` typescript
  yargs.command({
  command: 'add',
  describe: 'Writing a new note',
  builder: {
    title: {
      describe: 'Title of the note',
      demandOption: true,
      type: 'string',
    },
    user: {
      describe: 'Property of the note',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Content of the note',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color of the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      console.log(chalk.blue(`Adding new note...`));
      notesManager.addNote(argv.user, argv.title, argv.body, argv.color);
    }
  },
});
``` 

En este caso, vemos como es la estructura de adición de comando de yargs. En primer lugar, se añade el nombre del nuevo comando;
posteriormente, describimos que hace; seguidamente, se procede a escribir las opciones, tanto obligatorias como opcionales, que va 
a tener este comando; y finalmente, el manejador de este comando, el cual será prácticamente igual en todos los comandos, es decir,
comprobará que las opciones son strings y si es así, ejecutará el comando.

Así pues, el resto de comandos quedará de la siguiente manera:

``` typescript
yargs.command({
  command: 'read',
  describe: 'Read a certain note',
  builder: {
    title: {
      describe: 'Title of the note we want to read',
      demandOption: true,
      type: 'string',
    },
    user: {
      describe: 'Owner of the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      notesManager.readNote(argv.user, argv.title);
    }
  },
});

/**
 * Comando edit, el cual realiza la operación de editar una nota, a partir de las opciones
 * obligatorias user, title, body y color
 */
yargs.command({
  command: 'edit',
  describe: 'Modify the content of an already existing note',
  builder: {
    title: {
      describe: 'Title of the note we want to modify',
      demandOption: true,
      type: 'string',
    },
    user: {
      describe: 'Owner of the note',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'New content of the note',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'New Color for the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      notesManager.editNote(argv.user, argv.title, argv.body, argv.color);
    }
  },
});


/**
 * Comando remove, el cual realiza la operación de eliminar una nota, a partir de las opciones
 * obligatorias user y title
 */
yargs.command({
  command: 'rm',
  describe: 'Delete a note by the title and the owner',
  builder: {
    title: {
      describe: 'Title of the note we want to remove',
      demandOption: true,
      type: 'string',
    },
    user: {
      describe: 'Owner of the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      notesManager.removeNote(argv.user, argv.title);
    }
  },
});

/**
 * Comando list, el cual realiza la operación de eliminar una nota, a partir de las opciones
 * obligatorias user y title
 */
yargs.command({
  command: 'ls',
  describe: 'List all the notes from a certain user',
  builder: {
    user: {
      describe: 'Owner of the notes',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      notesManager.listNotes(argv.user);
    }
  },
});
``` 

Finalmente, para que la ejecución sea correcta, debemos ejecutar la orden *yargs.parse()*.

### Conclusiones

Con esta práctica nos hemos introducido en el desarrollo en type/javascript con API síncrona y con sistema de ficheros, siendo
útil para poder seguir desarrollando en el futuro. También cabe destacar, que no se ha podido hacer funcionar las github actions,
a pesar de estar habilitadas las mismas, puesto que la ruta añadida, solo funciona para este usuario.
  
  



