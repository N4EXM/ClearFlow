import { openDB } from 'idb';

let dbInstance = null;

async function getDB() {
  if (!dbInstance) {
    dbInstance = await openDB('ClearFlow_DB', 1, {
      upgrade(db) {
        db.createObjectStore('tasks', { keyPath: 'taskId' });
        db.createObjectStore('projects', { keyPath: 'projectsId' });
      }
    });
  }
  return dbInstance;
}

export default getDB