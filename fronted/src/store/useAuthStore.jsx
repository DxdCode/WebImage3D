import { create } from "zustand";
import api from "../utils/api";

let verificationPromise = null;

const useAuthStore = create((set, get) => ({
  isAuthenticated: false,
  isLoading: true,
  hasChecked: false,
  user: null,

  setUser: (user) => set({
    isAuthenticated: !!user,
    user,
    isLoading: false,
    hasChecked: true
  }),

  login: async (credentials) => {
    try {
      const res = await api.post("/user/login", credentials);
      set({ isAuthenticated: true, user: res.data.user, isLoading: false, hasChecked: true });
      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  },

  logout: async () => {
    try {
      await api.post("/user/logout");
    } catch (err) {
      console.error(err);
    } finally {
      set({ isAuthenticated: false, user: null, isLoading: false, hasChecked: true });
    }
  },

  checkAuth: async () => {
    const state = get();
    if (state.hasChecked && !state.isLoading) return state.isAuthenticated;

    if (verificationPromise) return verificationPromise;

    verificationPromise = new Promise(async (resolve) => {
      try {
        const res = await api.get("/user/verify");
        set({ isAuthenticated: true, user: res.data.user, isLoading: false, hasChecked: true });
        resolve(true);
      } catch {
        set({ isAuthenticated: false, user: null, isLoading: false, hasChecked: true });
        resolve(false);
      } finally {
        verificationPromise = null;
      }
    });

    return verificationPromise;
  }
}));

export default useAuthStore;
