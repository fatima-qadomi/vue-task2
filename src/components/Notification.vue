<script setup>
import { useNotificationStore } from "../stores/notification";
const store = useNotificationStore();
</script>

<template>
  <div class="top-5 right-5 z-[1000] fixed space-y-3">
    <transition-group name="fade" tag="div">
      <div
        v-for="note in store.notifications"
        :key="note.id"
        :class="[
          'px-4 py-2 rounded-lg shadow-lg text-white transition-all',
          note.type === 'success' ? 'bg-green-500' : 'bg-red-500',
        ]"
      >
        {{ note.message }}
      </div>
    </transition-group>
  </div>
</template>
