/**
 * Interfaz que obliga a la clase a tener los métodos esenciales 
 * para la gestión de las notas
 */
export interface noteManagement {
  addNote(user: string, title: string, body: string, color: string): boolean;
  readNote(user: string, title: string): boolean;
  editNote(user: string, title: string, body: string, color: string): boolean;
  removeNote(user: string, title: string): boolean;
  listNotes(user: string): boolean
}
