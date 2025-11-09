import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCounterStore = defineStore("counter", () => {
  //state
  const count = ref(0);

  //actions
  const increaseCount = () => {
    count.value++;
  };

  const decreaseCount = () => {
    count.value--;
  };

  //getters
  const oddOrEven = computed(() => (count.value % 2 === 0 ? "even" : "odd"));

  return {
    count,
    increaseCount,
    decreaseCount,
    oddOrEven,
  };
});
