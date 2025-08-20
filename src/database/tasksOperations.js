import getDB from "./db";

export async function addTask(task) {

    const db = await getDB()
    return db.add("tasks", task)

}

export async function getAllTasks() {
    
    const db = await getDB()
    return db.getAll("tasks")

}

// db.js
export async function addMultipleTasks(tasksArray) {
  try {
    const db = await dbPromise;
    const tx = db.transaction('tasks', 'readwrite');
    const store = tx.objectStore('tasks');

    const results = [];
    
    for (const task of tasksArray) {
      try {
        const id = await store.add(task);
        results.push({ success: true, id, task });
      } catch (error) {
        results.push({ success: false, error: error.message, task });
      }
    }

    await tx.done;
    return results;
    
  } catch (error) {
    throw new Error(`Bulk operation failed: ${error.message}`);
  }
}

export async function updateTask(id, updates) {
    
    const db = await getDB()
    return db.put("tasks", {...updates, id})

}

export async function deleteTask(taskId) {
    
    const db = await getDB()
    return db.delete("tasks", taskId)

}

export async function addProject(project) {
    
    const db = await getDB()
    return db.add("projects", project)

}

export async function getAllProjects() {
    
    const db = await getDB()
    return db.getAll("projects")

}

export async function updateProject(id, updates) {
    
    const db = await getDB()
    return db.put("projects", {...updates, id})

}

export async function deleteProject(id) {
    
    const db = await getDB()
    return db.delete("projects", id)

}