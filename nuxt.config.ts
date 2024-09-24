// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./app/components/ui",
  },
  colorMode: {
    classSuffix: "",
  },
  ssr: false,
});
