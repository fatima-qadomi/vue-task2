<template>
  <section
    class="flex flex-col bg-gradient-to-br from-rose-50 via-white to-pink-50 min-h-screen"
  >
    <nav
      class="flex justify-between items-center bg-white/70 shadow-sm px-8 py-4"
    >
      <div></div>

      <h1 class="font-bold text-rose-500 text-2xl">Your Cart</h1>

      <button
        @click="$router.push('/prods')"
        class="font-medium text-rose-500 hover:text-rose-600"
      >
        ← Back to Shopping
      </button>
    </nav>

    <div class="mx-auto px-4 py-12 container">
      <div
        v-if="cartStore.totalItems === 0"
        class="mt-20 text-gray-500 text-lg text-center"
      >
        Your cart is empty 🛒
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="(item, index) in cartStore.items"
          :key="index"
          class="flex justify-between items-center bg-white/80 shadow-md backdrop-blur-md p-4 rounded-xl"
        >
          <div class="flex items-center gap-4">
            <img
              :src="item.image"
              alt="product"
              class="rounded-lg w-24 h-24 object-cover"
            />
            <div>
              <h2 class="font-semibold text-gray-800">{{ item.title }}</h2>
              <p class="font-medium text-rose-500">${{ item.price }}</p>
            </div>
          </div>
          <i
            @click="cartStore.removeItem(index)"
            class="text-red-500 cursor-pointer fa-solid fa-trash"
          ></i>
        </div>

        <div class="mt-6 text-right">
          <p class="font-semibold text-gray-700 text-xl">
            Total: ${{ cartStore.totalPrice.toFixed(2) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useCartStore } from "../stores/cart";
const cartStore = useCartStore();
</script>
