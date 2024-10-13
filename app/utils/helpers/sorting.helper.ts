export const parseSortingUrl = (_sort?: string) => {
  if (!_sort) return [];

  const values = _sort.split(",").map((item) => {
    if (item.startsWith("-")) return { id: item.slice(1), desc: true };

    return { id: item, desc: false };
  });

  return values;
};

export const convertSortingToUrl = (
  sort: { id: string; desc: boolean }[],
): string | undefined => {
  const values = sort.map(({ id, desc }) => `${desc ? "-" : ""}${id}`);

  return values?.length ? values.join(",") : undefined;
};
