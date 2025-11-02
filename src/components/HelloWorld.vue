<script setup>
import { ref } from "vue";
// pt1
const message = ref("Hello Vue!");
const originText = "Hello Vue!";
const newText = "Welcome to Vue.js ";
function toggleMessage() {
  message.value = message.value === originText ? newText : originText;
}

// pt2
const name = ref("");

// pt3
const showMessage = ref(true);

// pt4
const fruits = ref(["Apple", "Banana", "Orange"]);
const newFruit = ref("");

function addFruit() {
  if (newFruit.value.trim() !== "") {
    fruits.value.push(newFruit.value.trim());
    newFruit.value = "";
  }
}

// pt5
const isPurple = ref(true);

function toggleBoxColor() {
  isPurple.value = !isPurple.value;
}
</script>

<template>
  <div class="flex flex-col justify-center items-center bg-gray-100 p-6 w-full min-h-screen">

    <div class="space-y-6 w-full max-w-6xl">

      <div class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <!-- pt1 -->
        <div class="flex flex-col items-center space-y-4 bg-white shadow-md p-6 border border-gray-300 rounded-xl">
          <h1 class="font-bold text-sky-800 text-3xl">{{ message }}</h1>
          <button
            @click="toggleMessage"
            class="bg-sky-600 hover:bg-sky-800 px-6 py-3 rounded-lg text-white transition"
          >
            Click Here!
          </button>
        </div>

        <!-- pt2 -->
        <div class="flex flex-col items-center space-y-4 bg-white shadow-md p-6 border border-gray-300 rounded-xl">
          <h1 class="font-semibold text-green-700 text-2xl">
            Hello, {{ name || "Dear" }}!
          </h1>
          <input
            v-model="name"
            type="text"
            placeholder="Enter your name"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
          />
        </div>

        <!-- pt3 -->
        <div class="flex flex-col items-center space-y-4 bg-white shadow-md p-6 border border-gray-300 rounded-xl">
          <label class="flex items-center space-x-2 text-lg">
            <input type="checkbox" v-model="showMessage" class="w-5 h-5" />
            <span>Show Hidden Message</span>
          </label>
          <p v-if="showMessage" class="font-medium text-purple-600 text-xl">
             This is a Hidden message!
          </p>
        </div>
      </div>

      <div class="flex justify-center gap-6">
        <!-- pt4 -->
        <div class="flex flex-col items-center space-y-4 bg-white shadow-md p-6 border border-gray-300 rounded-xl w-[48%]">
          <h2 class="font-semibold text-orange-700 text-2xl">Fruits List</h2>
          <ul class="pl-5 w-full text-gray-700 text-lg list-disc">
            <li v-for="(fruit, index) in fruits" :key="index">{{ fruit }}</li>
          </ul>
          <div class="flex space-x-2 w-full">
            <input
              v-model="newFruit"
              type="text"
              placeholder="Add a fruit"
              class="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              @click="addFruit"
              class="bg-orange-500 hover:bg-orange-700 px-4 py-1 rounded-lg text-white transition"
            >
              Add
            </button>
          </div>
        </div>

        <!-- pt5 -->
        <div class="flex flex-col items-center space-y-4 bg-white shadow-md p-6 border border-gray-300 rounded-xl w-[48%]">
          <h2 class="font-semibold text-purple-900 text-2xl">Color Box</h2>
          <div
            @click="toggleBoxColor"
            :class="isPurple ? 'bg-purple-800' : 'bg-purple-400'"
            class="rounded-lg w-32 h-32 transition-colors cursor-pointer"
          ></div>
          <p>Click the box to change its color!</p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
</style>
