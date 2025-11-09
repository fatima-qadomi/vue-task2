<template>
  <div>
    <Navbar />

    <div class="mt-10 text-center">
      <h1 class="mb-4 font-bold text-pink-600 text-3xl">Counter Page</h1>
      <p class="mb-6 text-gray-600 text-lg">counter using PINIA</p>

      <div class="inline-block bg-white shadow-md p-6 rounded-2xl">
        <h2 class="mb-4 font-semibold text-2xl">Count : {{ counter.count }}</h2>
        <p class="mb-4">Odd - Even: {{ counter.oddOrEven }}</p>
        <div class="flex justify-center gap-6">
          <button
            @click="counter.decreaseCount"
            class="bg-pink-400 hover:bg-pink-500 px-4 py-2 rounded-lg text-white"
          >
            -
          </button>
          <button
            @click="counter.increaseCount"
            class="bg-pink-800 hover:bg-pink-600 px-4 py-2 rounded-lg text-white"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { useCounterStore } from "../stores/counter";

const counter = useCounterStore();
</script>
