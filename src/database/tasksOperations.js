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

// tasksOperations.js
export async function getTasksByProjectId(projectId) {
  try {
    const db = await getDB();
    const tx = db.transaction('tasks', 'readonly');
    const store = tx.objectStore('tasks');
    const index = store.index('projectId'); // Use the index we created
    
    // Get all tasks with matching projectId
    const tasks = await index.getAll(projectId);
    await tx.done;
    
    return tasks;
  } catch (error) {
    console.error('Error getting tasks by project:', error);
    throw error;
  }
}

// tasksOperations.js - UPDATED
export async function addProject(project) {
  try {
    console.log('Adding project:', JSON.stringify(project, null, 2));
    const db = await getDB();
    const result = await db.add("projects", project);
    console.log('Project added successfully:', result);
    return result;
  } catch (error) {
    console.error('Error adding project:', error);
    console.error('Project data that failed:', project);
    throw error; // Re-throw to handle in calling function
  }
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