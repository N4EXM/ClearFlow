// db.js - ENHANCED with better logging
import { openDB } from 'idb';

let dbInstance = null;

// db.js - Updated
async function getDB() {
  if (!dbInstance) {
    dbInstance = await openDB('ClearFlow_DB', 2, { // ← Increment version number
      upgrade(db, oldVersion, newVersion, transaction) {
        // Handle database upgrades
        if (!db.objectStoreNames.contains('tasks')) {
          const taskStore = db.createObjectStore('tasks', { keyPath: 'taskId' });
          taskStore.createIndex('projectId', 'projectId', { unique: false }); // ← Add this
        }
        
        if (!db.objectStoreNames.contains('projects')) {
          db.createObjectStore('projects', { keyPath: 'projectId' });
        }
        
        // If upgrading from version 1, add the index
        if (oldVersion < 2) {
          const tx = transaction;
          const taskStore = tx.objectStore('tasks');
          if (!taskStore.indexNames.contains('projectId')) {
            taskStore.createIndex('projectId', 'projectId', { unique: false });
          }
        }
      }
    });
  }
  return dbInstance;
}

export default getDB;