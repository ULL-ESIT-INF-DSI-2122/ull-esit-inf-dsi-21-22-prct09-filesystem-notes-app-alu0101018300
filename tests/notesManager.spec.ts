import 'mocha';
import { expect } from 'chai';
import { NotesManager } from '../src/notesManager';

const testingNote: NotesManager = new NotesManager();

describe('test NotesManager class constructor', () => {
  it('new NotesManager() returns a NotesManager Object', () => {
    expect(testingNote).to.be.instanceof(NotesManager); 
  });
});

describe('test NotesManager addNote method', () => {
  it('object.addNote() returns a boolean', () => {
    expect(testingNote.addNote('Adrian','Tests', 'Realizando pruebas con chai', 'yellow')).is.a('boolean'); 
  });
  it('object.addNote() returns the correct boolean', () => {
    expect(testingNote.addNote('Adrian','Tests', 'Realizando pruebas con chai', 'yellow')).to.eql(false); 
  });
});

describe('test NotesManager readNote method', () => {
  it('object.readNote() returns a boolean', () => {
    expect(testingNote.readNote('Adrian','Tests')).is.a('boolean'); 
  });
  it('object.readNote() returns the correct boolean', () => {
    expect(testingNote.readNote('Adrian','Tests')).to.eql(true); 
  });
});

describe('test NotesManager editNote method', () => {
  it('object.editNote() returns a boolean', () => {
    expect(testingNote.editNote('Adrian','Tests', 'Realizando pruebas con chai', 'yellow')).is.a('boolean'); 
  });
  it('object.addNote() returns the correct boolean', () => {
    expect(testingNote.editNote('Adrian','Tests', 'Realizando pruebas con chai otra vez', 'yellow')).to.eql(true); 
  });
});

describe('test NotesManager listNote method', () => {
  it('object.listNote() returns a boolean', () => {
    expect(testingNote.listNotes('Adrian')).is.a('boolean'); 
  });
  it('object.readNote() returns the correct boolean', () => {
    expect(testingNote.listNotes('Adrian')).to.eql(true); 
  });
  it('object.readNote() returns the correct boolean', () => {
    expect(testingNote.listNotes('Pedro')).to.eql(false); 
  });
});

describe('test NotesManager removeNote method', () => {
  it('object.removeNote() returns a boolean', () => {
    expect(testingNote.removeNote('Adrian','Tests')).is.a('boolean'); 
  });
  it('object.removeNote() returns the correct boolean', () => {
    expect(testingNote.removeNote('Adrian','Tests')).to.eql(false); 
  });
});



