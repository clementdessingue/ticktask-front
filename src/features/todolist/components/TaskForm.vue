<template>
    <div class="pa-4 text-center">
        <v-dialog :modelValue="modelValue" @update:model-value="close" max-width="600" permanent>
            <v-card title="Ajouter une tâche">
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="taskEditing.title" label="Titre*" required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-select v-model="taskEditing.status" :items="['A faire', 'En cours', 'Terminée']"
                                label="Statut*" required />
                        </v-col>

                        <v-col cols="12">
                            <v-textarea v-model="taskEditing.description" label="Description*" required></v-textarea>
                        </v-col>
                    </v-row>

                    <small class="text-caption text-medium-emphasis">*Obligatoire</small>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Retour" variant="tonal" @click="close"></v-btn>
                    <v-btn color="primary" text="Confirmer" variant="tonal" @click="submitTask"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { addTask, type Task } from '../services/tasksServices'

const props = defineProps({
    modelValue: Boolean,
    task: {
        type: Object,
        default() {
            return {
                title: '',
                description: '',
                status: '',
                isEditing: false
            }
        }
    }
});

const taskEditing = ref(props.task)

const emits = defineEmits(['update:modelValue', 'update:task'])

async function submitTask() {
    const response = await addTask(taskEditing.value as Task)
    emits('update:task', taskEditing.value)
    emits('update:modelValue', false)
    taskEditing.value = {
        title: '',
        description: '',
        status: '',
        isEditing: false
    }
}

function close() {
    emits('update:modelValue', false);
}
</script>