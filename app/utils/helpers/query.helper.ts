import type { LocationQuery } from "vue-router";

const KEY_SEPARATOR = new URLSearchParams(",").toString();

export const applyQueryToURL = (query?: Record<string, any>) => {
  if (!query) return;

  const params: Record<string, any> = {};

  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length)
      params[key] = value.join(KEY_SEPARATOR);
    else if (value) params[key] = value;
    else params[key] = undefined;
  });

  const newQUery = Object.assign({}, useRoute().query, params);

  useRouter().replace({ query: newQUery });
};

export const parseQueryToObject = (query: LocationQuery) => {
  const params: Record<string, any> = {};

  Object.entries(query).forEach(([key, value]: [string, any]) => {
    if (value.includes(KEY_SEPARATOR)) params[key] = value.split(KEY_SEPARATOR);
    else params[key] = value;
  });

  return params;
};
