<template>
  <nav
    class="flex justify-center gap-6 bg-pink-100 shadow-md py-4 rounded-b-2xl text-gray-700"
  >
    <router-link
      to="/counter"
      class="font-medium hover:text-pink-500 transition-colors duration-300"
      active-class="text-pink-600 font-semibold"
    >
      Counter
    </router-link>

    <router-link
      to="/about"
      class="font-medium hover:text-pink-500 transition-colors duration-300"
      active-class="text-pink-600 font-semibold"
    >
      About
    </router-link>
  </nav>
</template>
