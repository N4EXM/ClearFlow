import Dexie from "dexie";

// Create the DB
export const db = new Dexie("ClearFlow_DB");

// Define schema
db.version(1).stores({
  projects: "projectId, name, date",
  tasks: "taskId, title, description,formattedDate, date, completed, projectId"
});

export async function getTasks() {
  return await db.tasks.toArray();
}

export async function addTask(task) {
  return await db.tasks.add(task);
}

export async function updateTask(id, updates) {
  return await db.tasks.update(id, updates);
}

export async function deleteTask(id) {
  return await db.tasks.delete(id);
}

export async function getProjects() {
  return await db.projects.toArray();
}

export async function addProject(project) {
  return await db.projects.add(project);
}

export async function updateProject(id, updates) {
  return await db.projects.update(id, updates);
}

export async function deleteProject(id) {
  // delete project
  await db.projects.delete(id);

  // also delete all related tasks
  await db.tasks.where("projectId").equals(id).delete();
}
