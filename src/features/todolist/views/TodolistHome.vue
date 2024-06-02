<template>
    <v-row>
        <v-col>
            <v-card v-for="task in tasks" :key="task._id" variant="tonal" :title="task.title" :subtitle="task.status"
                :text="task.description">
                <v-card-actions>
                    <v-btn color="primary" @click="deleteTask(task._id)">Supprimer</v-btn>
                    <v-btn @click="toggleTaskForm(task._id)">Modifier
                        <TaskForm :modelValue="task.isEditing" :task="task"
                            @update:modelValue="toggleTaskForm(task._id)" @update:task="updateTasks" />
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-btn class="text-none font-weight-regular" text="Ajouter" variant="tonal" @click="toggleTaskForm" />
            <TaskForm :modelValue="showNewTaskForm" @update:modelValue="toggleTaskForm" @update:task="updateTasks" />
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import TaskForm from '../components/TaskForm.vue'
import { findTasks, removeTask, type Task } from '../services/tasksServices'

const isLoadingTasks = ref(true)
const tasks = ref([] as Task[])
const showNewTaskForm = ref(false)

async function getTasks() {
    tasks.value = await findTasks()
    tasks.value = tasks.value.map((task) => {
        task.isEditing = false
        return task
    })
    isLoadingTasks.value = false
}

function updateTasks(newTask: Task) {
    const taskIdx = tasks.value.findIndex(task => task._id === newTask._id)
    if (taskIdx !== -1) {
        tasks.value[taskIdx] = newTask
    } else {
        tasks.value.push(newTask)
    }
}

async function deleteTask(taskId: string) {
    await removeTask(taskId)
    const newTasks = tasks.value.filter((task) => task._id !== taskId)
    tasks.value = newTasks
    return true
}

function toggleTaskForm(taskId: string) {
    const taskIdx = tasks.value.findIndex(task => task._id === taskId)
    if (taskIdx !== -1) {
        tasks.value[taskIdx].isEditing = !tasks.value[taskIdx].isEditing
    } else {
        showNewTaskForm.value = !showNewTaskForm.value
    }
}

onMounted(() => {
    getTasks()
})
</script>
