<template>
  <section
    class="flex flex-col bg-gradient-to-br from-rose-50 via-white to-pink-50 min-h-screen"
  >
    <nav
      class="relative flex justify-between items-center bg-white/70 shadow-sm px-8 py-4"
    >
      <h1
        class="left-1/2 absolute font-bold text-rose-500 text-2xl md:text-3xl -translate-x-1/2 transform"
      >
        Blossoms
      </h1>

      <div class="ml-auto text-gray-500 text-sm md:text-base">
        Showing
        <span class="font-semibold text-rose-500">{{ products.length }}</span>
        items
      </div>
    </nav>

    <div class="flex-1 mx-auto px-4 md:px-8 py-12 container">
      <div
        class="place-items-center gap-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <ProductCard
          v-for="prod in products"
          :key="prod.id"
          :title="prod.title"
          :image="prod.image"
          :price="prod.price"
          @buy="handleBuy"
        />
      </div>
    </div>
    <router-link
      to="/cart"
      class="right-6 bottom-6 fixed flex items-center gap-3 bg-white/90 shadow-lg hover:shadow-xl backdrop-blur-md px-5 py-3 border border-rose-100 rounded-2xl transition cursor-pointer"
    >
      <i class="text-rose-500 text-xl fa-solid fa-cart-shopping"></i>
      <div>
        <div class="font-semibold text-gray-700 text-sm">
          {{ cartStore.totalItems }} item(s)
        </div>
        <div class="text-gray-500 text-xs">
          Total: ${{ cartStore.totalPrice.toFixed(2) }}
        </div>
      </div>
    </router-link>
  </section>

  <Modal v-model="showModal" @close="showModal = false">
    <template #header>
      <h2 class="font-semibold text-rose-600 text-lg">Added to Cart 🩷</h2>
    </template>

    <template #body>
      <p class="text-gray-600">
        {{ selectedProduct.title }} has been added to your cart!
      </p>
    </template>

    <template #footer>
      <button
        class="bg-gray-200 mr-3 px-4 py-2 rounded-lg text-gray-700"
        @click="$router.push('/cart')"
      >
        Go to Cart
      </button>

      <button
        class="bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-lg text-white"
        @click="showModal = false"
      >
        Close
      </button>
    </template>
  </Modal>
</template>
<script setup>
import { ref } from "vue";
import ProductCard from "../components/ProductCard.vue";
import Modal from "../components/ModalComponent.vue";
import { useNotificationStore } from "../stores/notification";
import { useCartStore } from "../stores/cart";

const notify = useNotificationStore();

const cartStore = useCartStore();

const showModal = ref(false);
const selectedProduct = ref(null);

import Rose01 from "../assets/imgs/prod01.jpg";
import Rose02 from "../assets/imgs/prod02.jpg";
import Rose03 from "../assets/imgs/prod03.jpg";
import Rose04 from "../assets/imgs/prod04.jpg";

const products = ref([
  { id: 1, title: "Pink Rose Bouquet", image: Rose01, price: 25 },
  { id: 2, title: "Pink Rose in Glass Jar", image: Rose02, price: 28 },
  { id: 3, title: "Mini Rose Bouquet", image: Rose03, price: 22 },
  { id: 4, title: "Blush Rose Arrangement", image: Rose04, price: 18 },
]);

function handleBuy(product) {
  cartStore.addItem(product);
  selectedProduct.value = product;
  showModal.value = true;

  notify.addNotification(`${product.title} added to your cart!`, "success");
}
</script>
