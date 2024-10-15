import { categoryApi } from "~/apis/1-category.api";

export const useGetCategory = (id: string) =>
  useLazyAsyncData(`category-${id}`, () => categoryApi.getById(id));
