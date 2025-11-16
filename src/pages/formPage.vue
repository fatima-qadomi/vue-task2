<script setup>
import { ref, computed } from "vue";
import axios from "axios";

const isLogin = ref(false);

const name = ref("");
const email = ref("");
const password = ref("");
const touched = ref({ name: false, email: false, password: false });
const submitMessage = ref("");
const loading = ref(false);
const API_URL = "http://localhost:3000/users";

function markTouched(field) {
  touched.value[field] = true;
}

const nameError = computed(() =>
  !isLogin.value && touched.value.name && !name.value.trim()
    ? "Full name is required"
    : ""
);

const emailError = computed(() => {
  if (!touched.value.email) return "";
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  return valid ? "" : "Please enter a valid email";
});

const passwordError = computed(() =>
  touched.value.password && password.value.length < 6
    ? "Password must be at least 6 characters"
    : ""
);

async function handleSubmit() {
  touched.value = { name: true, email: true, password: true };
  submitMessage.value = "";

  if (
    !isLogin.value &&
    (nameError.value || emailError.value || passwordError.value)
  ) {
    submitMessage.value =
      "⚠️ Please fix the highlighted errors before continuing.";
    return;
  }

  if (isLogin.value && (emailError.value || passwordError.value)) {
    submitMessage.value = "⚠️ Invalid email or password.";
    return;
  }

  loading.value = true;

  try {
    if (isLogin.value) {
      const { data } = await axios.get(API_URL, {
        params: {
          email: email.value.trim(),
          password: password.value.trim(),
        },
      });

      if (data.length > 0) {
        submitMessage.value = `👋 Welcome back, ${
          data[0].name || data[0].email
        }!`;
      } else {
        submitMessage.value = "❌ Invalid email or password.";
      }
    } else {
      const response = await axios.post(API_URL, {
        name: name.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
      });
      submitMessage.value = `✅ Success! Welcome, ${response.data.name} 🎉`;
    }

    name.value = "";
    email.value = "";
    password.value = "";
    touched.value = { name: false, email: false, password: false };
  } catch (error) {
    console.error(error);
    submitMessage.value =
      error.response?.data?.message ||
      "❌ Something went wrong. Please try again.";
  } finally {
    loading.value = false;
    setTimeout(() => {
      submitMessage.value = "";
    }, 4000);
  }
}

function toggleForm() {
  isLogin.value = !isLogin.value;
  submitMessage.value = "";
  touched.value = { name: false, email: false, password: false };
  name.value = email.value = password.value = "";
}
</script>

<template>
  <div
    class="flex md:flex-row flex-col bg-gradient-to-r from-purple-200 to-purple-300 min-h-screen"
  >
    <div class="hidden md:flex justify-center items-center p-10 md:w-1/2">
      <img
        src="../assets/imgs/img01.png"
        alt="Pharmacy illustration"
        class="shadow-lg rounded-xl w-full max-w-md"
      />
    </div>

    <div class="flex flex-col justify-center items-center p-8 w-full md:w-1/2">
      <div
        class="bg-white shadow-2xl p-8 rounded-2xl w-full max-w-md transition-all duration-300"
      >
        <h1 class="mb-2 font-bold text-purple-900 text-3xl text-center">
          {{ isLogin ? "Welcome Back" : "Create Your Pharmacy Account" }}
        </h1>
        <p class="mb-6 text-gray-500 text-center">
          {{
            isLogin
              ? "Login to manage your pharmacy easily."
              : "Register to manage your prescriptions and health records easily."
          }}
        </p>

        <p
          v-if="submitMessage"
          class="mb-4 font-medium text-center"
          :class="
            submitMessage.includes('Success') ||
            submitMessage.includes('Welcome')
              ? 'text-green-600'
              : 'text-red-600'
          "
        >
          {{ submitMessage }}
        </p>

        <transition name="fade" mode="out-in">
          <form
            :key="isLogin ? 'login' : 'signup'"
            @submit.prevent="handleSubmit"
          >
            <div v-if="!isLogin" class="mb-4">
              <label class="block mb-1 font-medium text-purple-900"
                >Full Name</label
              >
              <input
                v-model="name"
                @blur="markTouched('name')"
                type="text"
                placeholder="Enter your full name"
                class="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900 w-full transition"
                :class="nameError ? 'border-red-300' : 'border-gray-200'"
              />
              <p v-if="nameError" class="mt-2 text-red-600 text-sm">
                {{ nameError }}
              </p>
            </div>

            <div class="mb-4">
              <label class="block mb-1 font-medium text-purple-900"
                >Email</label
              >
              <input
                v-model="email"
                @blur="markTouched('email')"
                type="email"
                placeholder="example@pharma.com"
                class="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900 w-full transition"
                :class="emailError ? 'border-red-300' : 'border-gray-200'"
              />
              <p v-if="emailError" class="mt-2 text-red-600 text-sm">
                {{ emailError }}
              </p>
            </div>

            <div class="mb-6">
              <label class="block mb-1 font-medium text-purple-900"
                >Password</label
              >
              <input
                v-model="password"
                @blur="markTouched('password')"
                type="password"
                placeholder="At least 6 characters"
                class="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900 w-full transition"
                :class="passwordError ? 'border-red-300' : 'border-gray-200'"
              />
              <p v-if="passwordError" class="mt-2 text-red-600 text-sm">
                {{ passwordError }}
              </p>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="bg-purple-900 hover:bg-purple-400 disabled:opacity-50 py-3 rounded-lg w-full font-semibold text-white transition"
            >
              <span v-if="loading">
                {{ isLogin ? "⏳ Logging in..." : "⏳ Creating Account..." }}
              </span>
              <span v-else>{{ isLogin ? "Login" : "Create Account" }}</span>
            </button>
          </form>
        </transition>

        <p class="mt-4 text-gray-500 text-sm text-center">
          {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
          <button
            @click="toggleForm"
            class="font-medium text-purple-900 hover:underline"
          >
            {{ isLogin ? "Sign up" : "Sign in" }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
