import getDB from "./db";

export async function addTask(task) {

    console.log('Adding task:', JSON.stringify(task, null, 2)); // ← Add this
    const db = await getDB()
    return db.add("tasks", task)

}

export async function getAllTasks() {
    
    const db = await getDB()
    return db.getAll("tasks")

}

// db.js
export async function addMultipleTasks(tasksArray) {
  const results = [];
  
  for (const task of tasksArray) {
    try {
      const id = await addTask(task); // ← Now properly awaited
      results.push({ success: true, id, task });
    } catch (error) {
      results.push({ success: false, error: error.message, task });
    }
  }
  
  return results;
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