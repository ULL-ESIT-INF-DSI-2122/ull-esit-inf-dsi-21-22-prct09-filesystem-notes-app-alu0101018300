import * as fs from 'fs';
import * as chalk from 'chalk';
import { noteManagement } from './noteManagement';
import {mkdir} from 'fs';

/**
 * Clase Notes Manager, la cual será la encargada de almacenar todos los
 * métodos de gestión de las notas
 */
export class NotesManager implements noteManagement{
  /**
   * El atributo path es el que almacenará el path del fichero deseado
   * en todo momento
   */
  private _path: string = '';
  constructor() {}

  /**
   * Funciṕn que modifica el atributo path para añadirle el usuario 
   * a un path general, para que se almacenen ahi sus notas
   * @param user usuario que vamos a añadir al path
   */
    private establishPath(user: string): void {
      this._path = `notes/` + user;
    }

  /**
   * Función que añade un nuevo directorio en caso de que ese usuario
   * no haya creado ninguna nota, este directorio tendrá el nombre del 
   * usuario
   */
  public addFolder(): void {
    if (!fs.existsSync(this._path)) {
      mkdir(this._path, (err) => {
        if (err) {
          return console.error(err);
        }
      });
    }
  }

  /**
   * Esta función es la que recorrerá los ficheros json de un usuario en concreto
   * @param path path del fichero que queremos leer
   */
  private travelNotes(path: string) {
    const note = JSON.parse(fs.readFileSync(path, 'utf8'));
    return note;
  }

  /**
   * Función que imprimirá con el formato deseado y usando chalk
   * @param color Color en el que vamos a imprimir
   * @param body Contenido que queremos imprimir
   */
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

  /**
   * Función que añade una nueva nota a nuestro directorio de notas
   * @param user Propietario de la nota
   * @param title Título de la nota
   * @param body Contenido de la nota
   * @param color Color de la nota
   */
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

  /**
   * Función que va a leer una nota almacenada con un título en concreto
   * @param user Propietario de la nota
   * @param title Título de la nota
   */
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

  /**
   * Función que va a modificar el contenido una nota ya existente, a partir de un usuario y un título
   * @param user Propietario de la nota
   * @param title Título de la nota
   * @param body Nuevo contenido de la nota
   * @param color Nuevo color de la nota
   */
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

  /**
   * Función que elimina una nota en concreto, a partir de un usuario y un título
   * @param user Propietario de la nota
   * @param title Título de la nota
   */
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

  /**
   * Función que muestra todas las notas de un usuario
   * @param user Usuario del que queremos conocer todas las notas
   */
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
}