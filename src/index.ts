import * as chalk from 'chalk';
import * as yargs from 'yargs';

import { NotesProcessor } from './methods'

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string',
      },
      user: {
        describe: 'User who writes the note',
        demandOption: true,
        type: 'string',
      },
      body: {
        describe: 'Body',
        demandOption: true,
        type: 'string',
      },
      color: {
        describe: 'Color',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
        /*console.log(chalk.green(`Adding note ${argv.title}`));
        let colorFinal:string = ' ';
        const _colors: string[] = ['red', 'green', 'blue', 'yellow'];
        for (let i: number = 0; i < _colors.length; i++) {
          if (argv.color === _colors[i]) {
            colorFinal = argv.color;
          } else {
            colorFinal = 'red';
          }
        }*/
        // const newTitle:string = argv.title.replace(/\s/g, '-');
        const noteManager: NotesProcessor = new NotesProcessor();
        noteManager.addNote(argv.user, argv.title, argv.body, argv.color);
        console.log(chalk.green('The note has been succesfully added'))
      }
    },
  });
  

