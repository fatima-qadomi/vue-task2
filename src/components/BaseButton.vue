<script setup>
defineProps({
  label: String, 
  color: {
    type: String,
    default: 'bg-blue-500'
  }
});

const emit = defineEmits(['click']); 
</script>

<template>
  <button
    @click="$emit('click')" 
    :class="`${color} px-4 py-2 rounded-lg text-white hover:brightness-110 transition`"
  >
    {{ label }}
  </button>
</template>
