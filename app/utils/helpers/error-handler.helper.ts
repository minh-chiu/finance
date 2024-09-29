import type { ErrorDetail } from "~/types/error-detail";
import type { Exception } from "~/types/exception";
import { ErrorTypeEnum } from "../enums";

const formatErrorMsg = (errorType: ErrorTypeEnum, details: ErrorDetail[]) => {
  if (errorType === ErrorTypeEnum.ValidationExceptions) {
    // const property = details?.[0]?.property;
    // const message = details?.[0]?.message;
    // return `${property?.[0].toUpperCase()}${property.slice(1)}: ${message}`;
  }
  return details?.[0]?.message || "Something went wrong!";
};

export const handleError = (error: any) => {
  let errorType = error.type,
    errorTitle = error.name;

  if (error.data) {
    const errorData: Exception = error.data;

    errorType = errorData.type;
    errorTitle = errorData.title;
  }

  const errorMsg = error.data
    ? formatErrorMsg(errorType, error.data.errors)
    : error.errorMsg;

  // eslint-disable-next-line no-console
  console.log("API ERROR :::::", { errorTitle, errorMsg });

  return {
    title: errorTitle,
    description: errorMsg,
  };
};

export const withLoading = async <T>(
  isLoading: globalThis.Ref<boolean>,
  func: () => Promise<T>,
  onSuccess: (result: T) => void,
  onError: (error: unknown) => void = handleError,
): Promise<void> => {
  isLoading.value = true;

  try {
    const result = await func();
    onSuccess(result);
  } catch (error) {
    onError(error);
  } finally {
    isLoading.value = false;
  }
};
