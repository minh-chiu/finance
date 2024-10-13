export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    _id: "1",
    value: "backlog",
    label: "Backlog",
    icon: "radix-icons:question-mark-circled",
    amount: 10,
  },
  {
    _id: "2",
    value: "todo",
    label: "Todo",
    icon: `material-symbols:circle-outline`,
    amount: 20,
  },
  {
    _id: "3",
    value: "in progress",
    label: "In Progress",
    icon: `solar:stopwatch-linear`,
    amount: 12,
  },
  {
    _id: "4",
    value: "done",
    label: "Done",
    icon: `iconoir:check-circled-outline`,
    amount: 12,
  },
  {
    _id: "5",
    value: "canceled",
    label: "Canceled",
    icon: `radix-icons:cross-circled`,
    amount: 12,
  },
];

export const priorities = [
  {
    _id: "1",
    value: "low",
    label: "Low",
    icon: `formkit:arrowdown`,
    amount: 5,
  },
  {
    _id: "2",
    value: "medium",
    label: "Medium",
    icon: `formkit:arrowright`,
    amount: 15,
  },
  {
    _id: "3",
    value: "high",
    label: "High",
    icon: `formkit:arrowup`,
    amount: 25,
  },
];
