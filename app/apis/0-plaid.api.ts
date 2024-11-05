import { authFetch } from "~/utils/fetch";

const PLAID_URL = "/plaid";
export const plaidApi = {
  //  ----- Method: POST -----
  createLinkToken: (): Promise<{
    expiration: string;
    link_token: string;
    request_id: string;
  }> => {
    return authFetch.post(`${PLAID_URL}/link/token/create`, {});
  },
};
