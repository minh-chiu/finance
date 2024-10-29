import { authFetch } from "~/utils/fetch";
import type { FetchOptions } from "~/utils/types/fetch.types";
import type { Category } from "~/validations/category.validation";

export interface SummaryQuery {
  from?: string;
  to?: string;
  accountId?: string;
}

export interface Summary {
  currentPeriod: {
    income: number;
    expenses: number;
    remaining: number;
  };
  lastPeriod: {
    income: number;
    expenses: number;
    remaining: number;
  };
  incomeChange: number;
  expensesChange: number;
  remainingChange: number;
  categories: {
    value: number;
    category: Category;
  }[];
  activeDays: {
    income: number;
    expenses: number;
    date: string;
  }[];
  days: {
    date: string;
    income: number;
    expenses: number;
  }[];
}

const SUMMARY_URL = "/summaries";
export const summaryApi = {
  //  ----- Method: GET -----
  getTransactionStats: (
    query: SummaryQuery,
    options?: FetchOptions,
  ): Promise<Summary> => {
    return authFetch.get(SUMMARY_URL, query, options);
  },
};
