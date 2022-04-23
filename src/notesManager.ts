import * as fs from 'fs';
import * as chalk from 'chalk';
import { noteManagement } from './noteManagement';

export class NotesManager implements noteManagement{
  private _path: string = '';
  constructor() {}

  private establishPath(user: string): void {
    this._path = `/home/usuario/Practicas/Practica9/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101018300/notes/${user}`;
  }

  private addFolder() {
    if (!fs.existsSync(this._path)) {
      fs.mkdirSync(this._path);
    }
  }

  private travelNotes(path: string) {
    const note = JSON.parse(fs.readFileSync(path, 'utf8'));
    return note;
  }

  private print(color: string, body:string) {
    if (color === 'red') {
      console.log(chalk.red(body));
    } else if (color === 'green') {
      console.log(chalk.green(body));
    } else if (color === 'blue') {
      console.log(chalk.blue(body));
    } else if (color === 'yellow') {
      console.log(chalk.yellow(body));
    }
    else {
      console.log(body);
      console.log(chalk.red.inverse(`${color} is not available`));
    }
  }

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
}