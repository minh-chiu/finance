import { authApi } from "~/apis/pre-built/1-auth.api";
import { userApi } from "~/apis/pre-built/2-user.api";
import { toast } from "~/components/ui/toast";
import type {
  AuthUser,
  Login,
  Register,
  ResetPasswordWithOtp,
  ResetPasswordWithToken,
} from "~/types/pre-built/1-auth";
import type { User } from "~/types/pre-built/2-user";
import type { AuthTokens } from "~/types/pre-built/9-token";
import { AccountTypeEnum } from "~/utils/enums";
import { handleApiError } from "~/utils/helpers/error-handler.helper";
import { storageHelper } from "~/utils/helpers/storage.helper";

export const useAuthStore = defineStore("auth", () => {
  const tokens = ref<AuthTokens | null>(storageHelper.getTokens());
  const user = ref<User | null>(storageHelper.getUser());
  const loading = ref<boolean>(false);

  const clearAuth = () => {
    tokens.value = null;
    user.value = null;
    storageHelper.clearAuth();
  };

  const login = (input: Login) => authenticate(() => authApi.login(input));
  const register = (input: Register) =>
    authenticate(() => authApi.register(input));
  const loginWithGoogle = (idToken: string) =>
    authenticate(() =>
      authApi.socialLogin({ accountType: AccountTypeEnum.Google, idToken }),
    );

  const logout = async () => {
    try {
      await authApi.logout();
      useRouter().push({
        path: "/sign-in",
        query: {
          goto: useRouter().currentRoute.value.fullPath,
        },
      });
    } catch (error) {
      handleApiError(error);
    }

    clearAuth();
  };

  const resetPasswordWithToken = (input: ResetPasswordWithToken) =>
    authenticate(() => authApi.resetPasswordWithToken(input));
  const resetPasswordWithOtp = (input: ResetPasswordWithOtp) =>
    authenticate(() => authApi.resetPasswordWithOtp(input));

  const getAccessToken = async () => {
    if (!tokens.value) return null;

    const currentMS = Date.now();
    const { accessToken, refreshToken } = tokens.value;

    if (new Date(accessToken.expiresAt).getTime() > currentMS)
      return accessToken.token;
    if (new Date(refreshToken.expiresAt).getTime() < currentMS)
      return clearAuth();

    await refreshTokens(refreshToken.token);
    await fetchMe();
    return tokens.value?.accessToken?.token;
  };

  const refreshTokens = async (rfToken: string) => {
    try {
      const data = await authApi.refreshToken(rfToken);
      tokens.value = data;
      storageHelper.setTokens(data);

      return data;
    } catch (error) {
      handleApiError(error);
      clearAuth();
    }
  };

  const refreshAuthFromSession = async () => {
    if (
      sessionStorage.getItem("refreshed") ||
      !tokens.value?.refreshToken?.token
    )
      return;

    sessionStorage.setItem("refreshed", "true");
    await refreshTokens(tokens.value.refreshToken.token);
  };

  const fetchMe = async () => {
    try {
      user.value = await userApi.getMe();
      storageHelper.setUser(user.value);
    } catch (error) {
      handleApiError(error);
      clearAuth();
    }

    return user.value;
  };

  /**
   * Generic async handler for authentication functions
   * @param handler Function returning a Promise<AuthUser | null>
   * @returns AuthUser | null
   */
  const authenticate = async (handler: () => Promise<AuthUser | null>) => {
    loading.value = true;
    try {
      const data = await handler();

      if (!data) {
        toast({ title: "Authentication failed", variant: "destructive" });
        return clearAuth();
      }

      tokens.value = data;
      storageHelper.setTokens(data);

      // Fetch user
      await fetchMe();

      return data;
    } catch (error) {
      toast({ ...handleApiError(error), variant: "destructive" });
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    tokens,
    user,
    loading,
    login,
    register,
    logout,
    getAccessToken,
    loginWithGoogle,
    resetPasswordWithOtp,
    resetPasswordWithToken,
    refreshAuthFromSession,
    fetchMe,
  };
});
