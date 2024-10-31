import { categoryApi } from "~/apis/1-category.api";

export const useGetCategories = () =>
  useAsyncData("categories", () => categoryApi.getAll(), {
    server: false,
    lazy: true,
    dedupe: "defer",
  });
