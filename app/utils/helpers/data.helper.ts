export const hasNonEmptyValue = (obj: { [key: string]: any }) => {
  return Object.values(obj).some(
    (value) => value !== undefined && value !== null && value !== "",
  );
};

export const convertStringToRegex = (value?: string) => {
  if (!value) return undefined;

  return new RegExp(value, "i").toString();
};
