export interface noteManagement {
  addNote(user: string, title: string, body: string, color: string): boolean;
  readNote(user: string, title: string): boolean;
  editNote(user: string, title: string, body: string, color: string): boolean;
  removeNote(user: string, title: string): boolean;
}