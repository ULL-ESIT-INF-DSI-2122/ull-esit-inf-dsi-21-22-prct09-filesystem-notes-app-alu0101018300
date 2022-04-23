import * as yargs from 'yargs';
import { NotesManager } from './notesManager';
import * as chalk from 'chalk';

const notesManager = new NotesManager();

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
      // const newTitle:string = argv.title.replace(/\s/g, '-');
      notesManager.readNote(argv.user, argv.title);
    }
  },
});

yargs.parse();

