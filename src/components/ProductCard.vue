<template>
  <div
    class="flex flex-col items-center bg-white/80 shadow-md hover:shadow-xl backdrop-blur-md p-5 border border-rose-100 rounded-2xl w-72 text-center transition"
  >
    <img
      :src="image"
      alt="product image"
      class="mb-4 rounded-xl w-48 h-48 object-cover"
    />
    <h2 class="mb-1 font-semibold text-gray-800 text-lg">{{ title }}</h2>
    <p class="mb-4 font-medium text-rose-500">${{ price.toFixed(2) }}</p>

    <button
      @click="$emit('buy', { title, price })"
      class="bg-gradient-to-r from-rose-400 hover:from-rose-500 to-pink-400 hover:to-pink-500 px-6 py-2 rounded-full text-white transition"
    >
      Buy Now
    </button>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  image: String,
  price: Number,
});

defineEmits(["buy"]);
</script>
