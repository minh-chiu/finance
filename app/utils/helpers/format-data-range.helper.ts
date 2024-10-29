import { format, subDays } from "date-fns";

export type Period = {
  from: string | Date | undefined;
  to: string | Date | undefined;
};
export const formatDataRange = (period: Period) => {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  if (!period.from)
    return `${format(defaultFrom, "LLL dd")} - ${format(defaultTo, "LLL dd, y")}`;

  if (period.to)
    return `${format(period.from, "LLL dd")} - ${format(period.to, "LLL dd, y")}`;

  return format(period.from, "LLL dd, y");
};

export const formatPercentage = (
  value: number,
  options: { addPrefix?: boolean } = { addPrefix: false },
) => {
  const result = new Intl.NumberFormat("en-US", {
    style: "percent",
  }).format(value / 100);

  if (options.addPrefix && value > 0) return `+${result}`;

  return result;
};
