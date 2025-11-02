<script setup>
import { ref, watch } from 'vue';

defineProps({
  msg: String
});

const emit = defineEmits(['reply']);

const childMsg = ref("");

function sendReply() {
  emit('reply', childMsg.value || "No reply");
}
</script>

<template>
  <div class="flex flex-col items-center space-y-3 bg-white shadow-md p-4 border border-gray-300 rounded-lg w-80">
    <p class="font-medium text-lg">Parent says: {{ msg }}</p>
    <input
      v-model="childMsg"
      type="text"
      placeholder="Type your reply..."
      class="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 w-full"
    />
    <button
      @click="sendReply"
      class="bg-sky-500 hover:bg-sky-700 px-4 py-2 rounded-lg text-white transition"
    >
      Send Reply
    </button>
  </div>
</template>
