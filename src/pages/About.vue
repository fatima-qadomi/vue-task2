<template>
  <div>
    <Navbar />

    <div class="mt-10 text-center">
      <h1 class="mb-4 font-bold text-pink-600 text-3xl">About Page</h1>

      <div class="inline-block bg-white shadow-md p-6 rounded-2xl">
        <h2 class="mb-4 font-semibold text-2xl">Count : {{ counter.count }}</h2>
        <p class="mb-4">Odd - Even: {{ counter.oddOrEven }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { useCounterStore } from "../stores/counter";

const counter = useCounterStore();
</script>
