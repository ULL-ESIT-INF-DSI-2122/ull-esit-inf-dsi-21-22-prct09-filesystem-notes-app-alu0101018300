import * as fs from 'fs';
import chalk from 'chalk';

export class NotesProcessor {
  constructor() {}

  private addingUserFolder (user: string) {
    const dir: string = `/home/usuario/Practicas/Practica9/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101018300/NotesStore/${user}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    else {
      console.log(chalk.red('User already exists'))
    }
  }

  private readUserNotes (json:string) {
    const notes = JSON.parse(fs.readFileSync(json, 'utf8'));
    return notes;
  }

  public addNote (user:string, title:string, body:string, color:string): boolean {
    this.addingUserFolder(user);
    const jsonfile = `/home/usuario/Practicas/Practica9/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101018300/NotesStore/${user}/${title}.json`;
    if (!fs.existsSync(jsonfile)) {
      fs.writeFileSync('/home/usuario/Practicas/Practica9/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101018300/NotesStore/${user}' + '/' + title + '.json', JSON.stringify({
        title: title,
        body: body,
        color: color,
      }));
      console.log(chalk.green(`The note has been created.`));
      return true;
    } else {
      console.log(chalk.red.inverse(`The note already exists.`));
      return false;
    }
  }

}