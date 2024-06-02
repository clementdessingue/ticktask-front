export type Task = {
    _id: string,
    title: string,
    description: string,
    status: string,
    isEditing: boolean
}

export async function findTasks () {
    const tasksResponse = await fetch(`${import.meta.env.VITE_API_HOST}/tasks`);
    const tasks = await tasksResponse.json();
    return tasks;
}

export async function addTask (task: Task) {
    const updateTask = task._id ? `/${task._id}`: ''
    const tasksResponse = await fetch(`${import.meta.env.VITE_API_HOST}/tasks${updateTask}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });
    return tasksResponse;
}

export async function removeTask (taskId: string) {
    const tasksResponse = await fetch(`${import.meta.env.VITE_API_HOST}/tasks/${taskId}`, {
        method: 'DELETE',
      });
      return tasksResponse;
}
