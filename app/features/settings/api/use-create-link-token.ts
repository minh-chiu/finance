import { useMutation } from "@tanstack/vue-query";
import { plaidApi } from "~/apis/0-plaid.api";
import { toast } from "~/components/ui/toast";
import { handleApiError } from "~/utils/helpers/error-handler.helper";

export const useCreateLinkToken = () => {
  const mutation = useMutation({
    mutationFn: () => plaidApi.createLinkToken(),
  });

  watch(mutation.error, () => {
    toast({
      ...handleApiError(mutation.error.value),
      variant: "destructive",
    });
  });

  return mutation;
};
