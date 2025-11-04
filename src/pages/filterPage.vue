<template>
  <div class="bg-gradient-to-r from-purple-200 to-purple-300 p-8 min-h-screen">
    <div class="bg-white shadow-lg mx-auto p-8 rounded-2xl max-w-3xl">
      <h1 class="mb-6 font-bold text-purple-900 text-3xl text-center">
        🛒 Product Search
      </h1>

      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search products..."
        class="mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900 w-full"
      />

      <div v-if="filteredProducts.length > 0" class="gap-4 grid md:grid-cols-2">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="shadow-sm hover:shadow-md p-4 border border-gray-200 rounded-xl transition"
        >
          <h2 class="font-semibold text-purple-900 text-xl">
            {{ product.name }}
          </h2>
          <p class="text-gray-500">{{ product.category }}</p>
        </div>
      </div>

      <p v-else class="mt-6 text-gray-500 text-center">
        No products found for "<span class="font-medium">{{ searchQuery }}</span
        >"
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFilter } from "../composables/useFilter";

const products = ref([
  { id: 1, name: "Paracetamol", category: "Medicine" },
  { id: 7, name: "Moisturizing Cream", category: "Skincare" },
  { id: 2, name: "Vitamin C", category: "Supplement" },
  { id: 3, name: "Toothpaste", category: "Hygiene" },
  { id: 5, name: "Face Mask", category: "Skincare" },
  { id: 6, name: "Hand Sanitizer", category: "Hygiene" },
  { id: 8, name: "Sunscreen", category: "Skincare" },
  { id: 15, name: "Shampoo", category: "Hair Care" },
]);

const { searchQuery, filteredItems: filteredProducts } = useFilter(products);
</script>
