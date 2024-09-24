// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt([
  { ignores: ["./.nuxt/**/*", "app/components/ui/**"] },
  {
    files: ["**/*.ts", "**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
]);
