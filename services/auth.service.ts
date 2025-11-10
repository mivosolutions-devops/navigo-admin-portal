import { AccountFormSchema } from "@/lib/schemas";
import { getAuthorizationHeader } from "@/lib/utils";
import axios, { AxiosInstance } from "axios";
import { z } from "zod";
import fetchAdapter from "@haverstack/axios-fetch-adapter";

export class AuthService {
  protected instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
      adapter: fetchAdapter,
    });
  }

  refreshToken = async (refreshToken: string) => {
    const response = await this.instance.post("/auth/refresh-token", {
      refreshToken,
    });
    return response;
  };

  logout = async (accessToken: string) => {
    const response = await this.instance.get("/auth/logout", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  };

  updateUserProfile = async (
    data: z.infer<typeof AccountFormSchema>,
    user: TUser,
  ) => {
    const dataToSubmit = Object.keys(data)
      .filter((key) => {
        const safeKey = key as keyof z.infer<typeof AccountFormSchema>;
        return data[safeKey] !== undefined && data[safeKey] !== user[safeKey];
      })
      .reduce(
        (obj, key) => {
          const safeKey = key as keyof z.infer<typeof AccountFormSchema>;
          obj[safeKey] = data[safeKey];
          return obj;
        },
        {} as z.infer<typeof AccountFormSchema>,
      );

    const response = await this.instance.patch(
      "/accounts/update-account",
      dataToSubmit,
      { headers: getAuthorizationHeader({}) },
    );
    return response;
  };

  updateProfilePicture = async (picUrl: string, baseUrl: string) => {
    const response = await this.instance.patch(
      "/profile/update-profile",
      { profilePicture: picUrl },
      { headers: getAuthorizationHeader({}), baseURL: baseUrl },
    );
    return response;
  };
}
