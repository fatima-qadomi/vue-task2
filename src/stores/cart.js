import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);

  const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  items.value = savedCart;

  const totalItems = computed(() => items.value.length);
  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price, 0)
  );

  function addItem(product) {
    items.value.push(product);
  }

  function removeItem(index) {
    items.value.splice(index, 1);
  }

  function clearCart() {
    items.value = [];
  }

  watch(
    items,
    (newItems) => {
      localStorage.setItem("cart", JSON.stringify(newItems));
    },
    { deep: true }
  );

  return { items, totalItems, totalPrice, addItem, removeItem, clearCart };
});
