// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxt/fonts",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@vueuse/nuxt",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./app/components/ui",
  },
  colorMode: {
    classSuffix: "",
  },
  ssr: false,
  runtimeConfig: {
    app: {},
    public: {
      apiBase: "",
      firebaseConfig: JSON.stringify({
        apiKey: "AIzaSyBbLtFYvYm4Hsi5-Wm2HkO02dPkpywB0uo",
        authDomain: "neste-e98ac.firebaseapp.com",
        projectId: "neste-e98ac",
        storageBucket: "neste-e98ac.appspot.com",
        messagingSenderId: "666248768541",
        appId: "1:666248768541:web:14229321d69ad91c28aaf4",
        measurementId: "G-PHKNRTDMZ5",
      }),
    },
  },

  components: [
    {
      path: "~/components/shared",
      extensions: [".vue"],
      prefix: "",
    },
    {
      path: "~/components",
      extensions: [".vue"],
      prefix: "",
    },
  ],

  fonts: {
    families: [
      { name: "Inter", provider: "google" },
      // { name: 'Other Font', src: 'https://example.com/font.woff2', weight: 'bold' },
    ],
  },
});
