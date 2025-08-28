import getDB from "./db";

export async function addTask(task) {
  try {
    console.log('Adding task:', task);
    const db = await getDB();
    const result = await db.add('tasks', task);
    
    // Update project stats if this task belongs to a project
    if (task.projectId) {
      await updateProjectCompletion(task.projectId);
    }
    
    return result;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
}

export async function getAllTasks() {
    
    const db = await getDB()
    return db.getAll("tasks")

}

// db.js
export async function addMultipleTasks(tasksArray) {
  const results = [];
  const projectsToUpdate = new Set();
  
  for (const task of tasksArray) {
    try {
      const id = await addTask(task);
      results.push({ success: true, id, task });
      
      // Track projects that need updating
      if (task.projectId) {
        projectsToUpdate.add(task.projectId);
      }
    } catch (error) {
      results.push({ success: false, error: error.message, task });
    }
  }
  
  // Update all affected projects
  for (const projectId of projectsToUpdate) {
    try {
      await updateProjectCompletion(projectId);
    } catch (error) {
      console.error(`Error updating project ${projectId}:`, error);
    }
  }
  
  return results;
}

export async function updateTask(id, updates) {
  try {
    const db = await getDB();
    
    // First get the current task to check if projectId changed
    const currentTask = await db.get('tasks', id);
    
    // Update the task
    const result = await db.put('tasks', { ...updates, id });

    console.log(updates)
    
    // If completion status changed or project changed, update project stats
    if (updates.completed !== undefined || updates.projectId !== undefined) {
      // Update both old and new projects (if project changed)
      if (currentTask && currentTask.projectId) {
        await updateProjectCompletion(currentTask.projectId);
      }
      if (updates.projectId) {
        await updateProjectCompletion(updates.projectId);
      }
    }
    
    return result;
    
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

export async function deleteTask(taskId) {
  try {
    const db = await getDB();
    
    // First get the task to know which project to update
    const task = await db.get('tasks', taskId);
    
    // Delete the task
    await db.delete('tasks', taskId);
    
    // Update project stats if this task belonged to a project
    if (task && task.projectId) {
      await updateProjectCompletion(task.projectId);
    }
    
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
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

export async function deleteTasksByProjectId(projectId) {
  try {
    const db = await getDB();
    const tx = db.transaction('tasks', 'readwrite');
    const store = tx.objectStore('tasks');
    
    // If we have an index, use it for better performance
    if (store.indexNames.contains('projectId')) {
      const index = store.index('projectId');
      
      // Get all tasks for this project to return details
      const tasks = await index.getAll(projectId);
      const taskIds = tasks.map(task => task.taskId);
      
      // Delete all tasks
      await Promise.all(taskIds.map(id => store.delete(id)));
      await tx.done;
      
      console.log(`Deleted ${taskIds.length} tasks for project ${projectId}`);
      return { count: taskIds.length, deletedTasks: tasks };
    }
    
    // Fallback: manual filtering (slower but works without index)
    const allTasks = await store.getAll();
    const projectTasks = allTasks.filter(task => task.projectId === projectId);
    const taskIds = projectTasks.map(task => task.taskId);
    
    await Promise.all(taskIds.map(id => store.delete(id)));
    await tx.done;
    
    console.log(`Deleted ${taskIds.length} tasks for project ${projectId}`);
    return { count: taskIds.length, deletedTasks: projectTasks };
    
  } catch (error) {
    console.error('Error deleting tasks by project:', error);
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

// tasksOperations.js
export async function getProjectById(projectId) {
  try {
    const db = await getDB();
    const project = await db.get('projects', projectId);
    
    if (!project) {
      throw new Error(`Project with ID ${projectId} not found`);
    }
    
    return project;
  } catch (error) {
    console.error('Error getting project:', error);
    throw error;
  }
}

// tasksOperations.js
export async function updateProjectCompletion(projectId) {
  try {
    // Get all tasks for this project
    const tasks = await getTasksByProjectId(projectId);
    const project = await getProjectById(projectId)
    
    // Calculate completion stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const remainingTasks = totalTasks - completedTasks;
    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    // Update the project
    const db = await getDB();
    await db.put('projects', {
      projectId: projectId,
      name: project.name,
      date: project.date, 
      percentage: percentage,
      totalTasks: totalTasks,
      remaining: remainingTasks
    });
        
    return { percentage, completedTasks, totalTasks, remainingTasks };
    
  } catch (error) {
    console.error('Error updating project completion:', error);
    throw error;
  }
}

export async function updateProjectTasks(projectId, tasks) {

  try {

    await deleteTasksByProjectId(projectId)

    const results = await addMultipleTasks(tasks)

    return results

  }
  catch (error) {
    console.log(error)
  }

  

} 