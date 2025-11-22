import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
  }),

  getters: {
    isAuthenticated: (state) => state.token !== null,
  },

  actions: {
    login(user) {
      const fakeToken = "fake-jwt-" + Date.now();

      this.user = user;
      this.token = fakeToken;

      localStorage.setItem("token", fakeToken);
      localStorage.setItem("user", JSON.stringify(user));
    },

    logout() {
      this.user = null;
      this.token = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});
