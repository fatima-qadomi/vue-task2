<template>
  <div class="bg-gradient-to-br from-purple-100 to-blue-50 p-8 min-h-screen">
    <div class="bg-white shadow-xl mx-auto p-6 md:p-10 rounded-2xl max-w-5xl">
      <h1
        class="mb-6 font-bold text-purple-900 text-3xl md:text-4xl text-center"
      >
        Users Directory
      </h1>

      <div class="flex justify-end mb-6">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="🔎 Search"
          class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900 w-72"
        />
      </div>

      <div v-if="loading" class="flex justify-center mt-6">
        <LottieLoader
          animationPath="src/assets/loaders/loader.json"
          :loop="true"
          :autoplay="true"
        />
      </div>

      <div v-if="error" class="mb-4 font-semibold text-red-500 text-center">
        {{ error }}
      </div>

      <div v-if="!loading && filteredUsers.length" class="overflow-x-auto">
        <table class="rounded-lg divide-y divide-gray-200 min-w-full">
          <thead class="bg-purple-100">
            <tr>
              <th
                class="px-6 py-3 font-medium text-purple-700 text-xs text-left uppercase"
              >
                ID
              </th>
              <th
                class="px-6 py-3 font-medium text-purple-700 text-xs text-left uppercase"
              >
                Name
              </th>
              <th
                class="px-6 py-3 font-medium text-purple-700 text-xs text-left uppercase"
              >
                Username
              </th>
              <th
                class="px-6 py-3 font-medium text-purple-700 text-xs text-left uppercase"
              >
                Email
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="user in filteredUsers"
              :key="user.id"
              class="hover:bg-purple-50 transition"
            >
              <td class="px-6 py-4">{{ user.id }}</td>
              <td class="px-6 py-4 font-medium text-gray-800">
                {{ user.name }}
              </td>
              <td class="px-6 py-4 text-gray-600">
                {{ user.username }}
              </td>
              <td class="px-6 py-4 text-gray-600">
                {{ user.email }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else-if="!loading" class="mt-6 text-gray-500 text-center">
        No users found.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import LottieLoader from "../components/loaders/LottieLoader.vue";
import { useFilter } from "../composables/useFilter.js";

const users = ref([]);
const loading = ref(false);
const error = ref(null);

async function fetchUsers() {
  loading.value = true;
  error.value = null;
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    setTimeout(() => {
      users.value = res.data;
      loading.value = false;
    }, 1500);
  } catch (err) {
    error.value = "Failed to fetch users. Please try again.";
    loading.value = false;
  }
}

onMounted(() => {
  fetchUsers();
});

const { searchQuery, filteredItems: filteredUsers } = useFilter(users, [
  "name",
  "username",
  "email",
]);
</script>
