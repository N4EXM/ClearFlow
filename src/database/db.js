// db.js - ENHANCED with better logging
import { openDB } from 'idb';

let dbInstance = null;

async function getDB() {
  if (!dbInstance) {
    dbInstance = await openDB('ClearFlow_DB', 1, {
      upgrade(db) {
        console.log('Creating database stores...');
        
        // Create tasks store
        if (!db.objectStoreNames.contains('tasks')) {
          const taskStore = db.createObjectStore('tasks', { keyPath: 'taskId' });
          taskStore.createIndex('projectId', 'projectId', { unique: false });
          console.log('Tasks store created');
        }
        
        // Create projects store  
        if (!db.objectStoreNames.contains('projects')) {
          const projectStore = db.createObjectStore('projects', { keyPath: 'projectId' });
          projectStore.createIndex('name', 'name', { unique: false });
          console.log('Projects store created');
        }
      }
    });
  }
  return dbInstance;
}

export default getDB;