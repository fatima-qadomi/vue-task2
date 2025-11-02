<script setup>
import { ref } from "vue";
import HelloWorld from "../components/HelloWorld.vue";
import BaseButton from "../components/BaseButton.vue";
import ChildMessage from "../components/ChildMsg.vue";

// BaseButton function
function sayHello() {
  alert("Button clicked!");
}

// Parent-Child
const parentMsg = ref("Hello from Parent!");
const replyMsg = ref("");

function handleReply(msg) {
  replyMsg.value = msg;
}
</script>

<template>
  <div
    class="flex flex-col items-center space-y-8 bg-gray-100 p-6 min-h-screen"
  >
    <!-- HelloWorld -->
    <HelloWorld msg="Vite + Vue" />

    <!-- BaseButton -->
    <BaseButton label="Click !" color="bg-sky-700" @click="sayHello" />

    <!-- Parent-Child Communication -->
    <div
      class="flex flex-col items-center space-y-4 bg-white shadow-md p-6 border border-gray-300 rounded-lg w-80"
    >
      <h2 class="font-bold text-2xl text-center">Parent-Child Communication</h2>
      <ChildMessage :msg="parentMsg" @reply="handleReply" />
      <p class="mt-2 font-medium text-gray-800">Child says: {{ replyMsg }}</p>
    </div>
  </div>
</template>
