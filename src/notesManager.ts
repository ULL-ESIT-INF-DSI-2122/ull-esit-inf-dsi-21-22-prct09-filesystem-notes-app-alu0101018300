import * as fs from 'fs';
import * as chalk from 'chalk';
import { noteManagement } from './noteManagement';

export class NotesManager implements noteManagement{
  private _path: string = '';
  constructor() {}

  private establishPath(user:string):void {
    this._path = `/home/usuario/Practicas/Practica9/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101018300/notes/${user}`;
  }

  private addFolder() {
    if (!fs.existsSync(this._path)) {
      fs.mkdirSync(this._path);
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
}