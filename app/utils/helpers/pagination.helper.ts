import type { PaginationParams } from "../types/fetch.types";
import {
  convertFieldsToString,
  type FieldObject,
} from "./field-formatter.helper";

export const convertQueryToPaginationParams = (query: {
  _page?: number | string;
  _limit?: number | string;
  _sort?: string;
  _populate?: string | string[];
  _fields?: FieldObject | string;
  [key: string]: any;
}): PaginationParams => {
  const params: PaginationParams = {};

  const { _page, _limit, _sort, _populate, _fields, ...rest } = query;

  if (_page) params._page = _page;

  if (_limit) params._limit = _limit;

  if (_sort) params._sort = _sort;

  if (_populate)
    params._populate = Array.isArray(query._populate)
      ? query._populate.join(",")
      : query._populate;

  if (_fields)
    params._fields =
      typeof _fields === "string" ? _fields : convertFieldsToString(_fields);

  return { ...params, ...rest };
};

export const getQueryParams = ({
  _sort,
  _limit,
  _page,
}: Record<string, any>) => {
  return { _sort, _limit, _page };
};

export const URLSearchParamsString = ({
  _limit,
  _sort,
  _page,
}: PaginationParams) => {
  return new URLSearchParams(
    convertQueryToPaginationParams({ _sort, _limit, _page }),
  ).toString();
};
