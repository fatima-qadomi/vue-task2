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

      <div v-if="!loading && paginatedUsers.length" class="overflow-x-auto">
        <table class="rounded-lg divide-y divide-gray-200 min-w-full">
          <thead class="bg-purple-100">
            <tr>
              <th
                class="px-6 py-3 font-medium text-purple-700 text-xs text-left uppercase"
              >
                ID
              </th>
              <th
                @click="toggleSort('name')"
                class="px-6 py-3 font-medium text-purple-700 text-xs text-left uppercase cursor-pointer select-none"
              >
                Name
                <span v-if="sortKey === 'name'">{{
                  sortOrder === "asc" ? "▲" : "▼"
                }}</span>
              </th>
              <th
                @click="toggleSort('username')"
                class="px-6 py-3 font-medium text-purple-700 text-xs text-left uppercase cursor-pointer select-none"
              >
                Username
                <span v-if="sortKey === 'username'">{{
                  sortOrder === "asc" ? "▲" : "▼"
                }}</span>
              </th>
              <th
                @click="toggleSort('email')"
                class="px-6 py-3 font-medium text-purple-700 text-xs text-left uppercase cursor-pointer select-none"
              >
                Email
                <span v-if="sortKey === 'email'">{{
                  sortOrder === "asc" ? "▲" : "▼"
                }}</span>
              </th>
              <th
                class="px-6 py-3 font-medium text-purple-700 text-xs text-left uppercase"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="user in paginatedUsers"
              :key="user.id"
              class="hover:bg-purple-50 transition"
            >
              <td class="px-6 py-4">{{ user.id }}</td>
              <td class="px-6 py-4 font-medium text-gray-800">
                {{ user.name }}
              </td>
              <td class="px-6 py-4 text-gray-600">{{ user.username }}</td>
              <td class="px-6 py-4 text-gray-600">{{ user.email }}</td>
              <td class="px-6 py-4">
                <i
                  @click="openDeleteModal(user)"
                  class="text-red-500 cursor-pointer fa-solid fa-trash"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-center gap-2 mt-4">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="bg-purple-200 hover:bg-purple-300 disabled:opacity-50 px-2 py-1 rounded text-sm"
          >
            ←
          </button>
          <span class="px-2 py-1 font-medium text-sm">
            {{ currentPage }} / {{ totalPages }}
          </span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="bg-purple-200 hover:bg-purple-300 disabled:opacity-50 px-2 py-1 rounded text-sm"
          >
            →
          </button>
        </div>
      </div>

      <div v-else-if="!loading" class="mt-6 text-gray-500 text-center">
        No users found.
      </div>
    </div>
  </div>

  <Modal v-model="showModal">
    <template #header>
      <h2 class="font-bold text-gray-800 text-lg">Confirm Delete</h2>
    </template>
    <template #default>
      Are you sure you want to delete
      <strong class="text-purple-800">{{ userToDelete?.name }}</strong
      >?
    </template>
    <template #footer>
      <button
        @click="showModal = false"
        class="bg-gray-300 hover:bg-gray-400 mr-2 px-4 py-2 rounded-lg"
      >
        Cancel
      </button>
      <button
        @click="confirmDelete"
        class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
      >
        Confirm
      </button>
    </template>
  </Modal>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import LottieLoader from "../components/loaders/LottieLoader.vue";
import Modal from "../components/ModalComponent.vue";
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

const sortKey = ref(null);
const sortOrder = ref("asc");
function toggleSort(key) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortOrder.value = "asc";
  }
}

const sortedUsers = computed(() => {
  const list = [...filteredUsers.value];
  if (!sortKey.value) return list;
  const key = sortKey.value;
  return list.sort((a, b) => {
    const A = (a[key] || "").toString().toLowerCase();
    const B = (b[key] || "").toString().toLowerCase();
    if (A < B) return sortOrder.value === "asc" ? -1 : 1;
    if (A > B) return sortOrder.value === "asc" ? 1 : -1;
    return 0;
  });
});

const currentPage = ref(1);
const perPage = ref(4);

const totalPages = computed(() =>
  Math.ceil(sortedUsers.value.length / perPage.value)
);

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return sortedUsers.value.slice(start, start + perPage.value);
});

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

const showModal = ref(false);
const userToDelete = ref(null);

function openDeleteModal(user) {
  userToDelete.value = user;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  userToDelete.value = null;
}

function confirmDelete() {
  if (userToDelete.value) {
    users.value = users.value.filter((u) => u.id !== userToDelete.value.id);
  }
  closeModal();
}
</script>

