import getDB from "./db";

export async function addTask(task) {

    const db = await getDB()
    return db.add("tasks", task)

}

export async function getAllTasks() {
    
    const db = await getDB()
    return db.getAll("tasks")

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