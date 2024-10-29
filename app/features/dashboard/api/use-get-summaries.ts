import { categoryApi } from "~/apis/1-category.api";

export const useGetSummaries = () =>
  useAsyncData("summaries", () => categoryApi.getAll(), {
    server: false,
    lazy: true,
  });
