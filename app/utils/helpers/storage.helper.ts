import type { User } from "~/types/pre-built/2-user";
import type { AuthTokens } from "~/types/pre-built/9-token";

export const storageKeys = {
  user: "_user",
  token: "_app_login",
  carts: "carts",
};

export const storageHelper = {
  getTokens(): AuthTokens | null {
    const tokensString = localStorage.getItem(storageKeys.token);

    return tokensString ? JSON.parse(tokensString) : null;
  },

  setTokens(tokens: AuthTokens) {
    localStorage.setItem(storageKeys.token, JSON.stringify(tokens));
  },

  getUser(): User | null {
    const userString = localStorage.getItem(storageKeys.user);

    return userString ? JSON.parse(userString) : null;
  },

  setUser(user: User) {
    localStorage.setItem(storageKeys.user, JSON.stringify(user));
  },

  clearAuth() {
    localStorage.removeItem(storageKeys.token);
    localStorage.removeItem(storageKeys.user);
  },

  getCarts() {
    const carts = localStorage.getItem(storageKeys.carts);

    return carts ? JSON.parse(carts) : null;
  },

  setCarts(carts: any[]) {
    localStorage.setItem(storageKeys.carts, JSON.stringify(carts));
  },

  clearCarts() {
    localStorage.removeItem(storageKeys.carts);
  },
};
