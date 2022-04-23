export interface noteManagement {
  addNote(user: string, title: string, body: string, color: string): boolean;
  readNote(user: string, title: string): boolean;
}