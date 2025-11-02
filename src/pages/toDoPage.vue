<script setup>
import { ref } from "vue";
import TodoItem from "../components/TodoItem.vue";
import BaseButton from "../components/BaseButton.vue";

const newTask = ref("");
const tasks = ref([]);

function addTask() {
  if (newTask.value.trim() !== "") {
    tasks.value.push({
      id: Date.now(),
      text: newTask.value,
      completed: false,
    });
    newTask.value = "";
  }
}

function toggleTask(id) {
  const task = tasks.value.find(t => t.id === id);
  if (task) task.completed = !task.completed;
}

function deleteTask(id) {
  tasks.value = tasks.value.filter(t => t.id !== id);
}
</script>

<template>
  <div class="flex flex-col items-center space-y-6 bg-gray-100 p-8 min-h-screen">
    <h1 class="font-bold text-sky-800 text-3xl">📝 To-Do List App</h1>

    <div class="flex space-x-2">
      <input v-model="newTask" placeholder="Add a new task..."
        class="flex-1 px-4 py-2 border rounded focus:ring-2 focus:ring-sky-700" />
      <BaseButton label="Add" color="bg-sky-800" @click="addTask" />
    </div>

    <div class="space-y-2 w-full max-w-md">
      <TodoItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="toggleTask"
        @delete="deleteTask"
      />
    </div>
  </div>
</template>
