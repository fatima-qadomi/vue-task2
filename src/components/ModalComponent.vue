<template>
  <div
    v-show="visible"
    class="z-50 fixed inset-0 flex justify-center items-center bg-pink-100 bg-opacity-50"
    @click.self="close"
  >
    <div
      ref="modalRef"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      :aria-label="ariaLabel"
      class="relative bg-white dark:bg-pink-200 shadow-xl p-6 rounded-2xl focus:outline-none w-11/12 max-w-lg max-h-[90vh] overflow-auto"
    >
      <button
        @click="close"
        class="top-3 right-3 absolute text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none"
        aria-label="Close modal"
      >
        ×
      </button>

      <header
        v-if="$slots.header"
        class="mb-4 pb-2 border-gray-200 dark:border-gray-700 border-b"
      >
        <slot name="header"></slot>
      </header>

      <section class="mb-4">
        <slot></slot>
      </section>

      <footer
        v-if="$slots.footer"
        class="pt-2 border-gray-200 dark:border-gray-700 border-t text-right"
      >
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  ariaLabel: { type: String, default: "Modal dialog" },
});

const emit = defineEmits(["update:modelValue", "close"]);

const modalRef = ref(null);
const visible = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    visible.value = val;
    if (val) focusModal();
  }
);

function focusModal() {
  setTimeout(() => modalRef.value?.focus?.(), 0);
}

function close() {
  emit("update:modelValue", false);
  emit("close");
  visible.value = false;
}

function onKeydown(e) {
  if (e.key === "Escape" || e.key === "Esc") {
    close();
  }
}

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
  if (visible.value) focusModal();
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
});
</script>
