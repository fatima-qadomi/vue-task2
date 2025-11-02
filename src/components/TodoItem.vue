<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  task: Object,
});

const emit = defineEmits(["toggle", "delete"]);

function toggle() {
  emit("toggle", props.task.id);
}

function remove() {
  emit("delete", props.task.id);
}
</script>

<template>
  <div class="flex justify-between items-center bg-white shadow p-2 rounded">
    <input type="checkbox" :checked="task.completed" @change="toggle" />
    <span :class="{ 'line-through text-gray-400': task.completed }">
      {{ task.text }}
    </span>
    <button @click="remove" class="text-red-500">Delete</button>
  </div>
</template>
