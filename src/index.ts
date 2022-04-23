import * as yargs from 'yargs';
import { NotesManager } from './notesManager';
import * as chalk from 'chalk';

/**
 * Objeto con el que realizaremos las operaciones necesarias
 */
const notesManager = new NotesManager();

/**
 * Comando add, el cual realiza la operación de añadir nota, a partir de las opciones
 * obligatorias user, title, body y color
 */
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


/**
 * Comando read, el cual realiza la operación de leer una nota, a partir de las opciones
 * obligatorias user y title
 */
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

// Solucionando problemas con los workflows
yargs.parse();

