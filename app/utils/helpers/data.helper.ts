export const hasNonEmptyValue = (obj: { [key: string]: any }) => {
  return Object.values(obj).some(
    (value) =>
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value?.length > 0,
  );
};

export const convertStringToRegex = (value?: string) => {
  if (!value) return undefined;

  return new RegExp(value, "i").toString();
};
