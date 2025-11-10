import { getAuthorizationHeader } from "@/lib/utils";
import axios, { AxiosInstance } from "axios";
import fetchAdapter from "@haverstack/axios-fetch-adapter";
import { z } from "zod";
import { RegisterFormSchema } from "@/lib/schemas";

export class UsersService {
  protected instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
      adapter: fetchAdapter,
    });
  }

  getUsers = async (
    { limit = 10, page = 1, orderBy, orderDirection, search }: TParams,
    options?: Record<string, boolean>,
  ) => {
    const params = {
      page,
      limit,
      search,
      orderBy,
      orderDirection,
      ...options,
    };

    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined),
    );

    const response = await this.instance.get(`/users`, {
      headers: getAuthorizationHeader({}),
      params: filteredParams,
    });

    return response.data.payload
  };

  getMe = async ({
    isClient,
    tokens,
  }: {
    isClient?: boolean;
    tokens?: TAuthTokens;
  }) => {
    const response = await this.instance.get(`/profiles/get-profile`, {
      headers: getAuthorizationHeader({ isClient, tokens }),
    });
    return response;
  };

  getUser = async (id: string, options: Record<string, boolean>) => {
    const params: Record<string, boolean> = {};

    Object.keys(options).forEach((key) => {
      if (options[key] !== undefined) params[key] = options[key];
    });

    const response = await this.instance.get(`/users/${id}`, {
      headers: getAuthorizationHeader({}),
      params,
    });

    return response.data.payload
  };

  addRolesToUser = async (roles: string[], userId: string) => {
    return await this.instance.patch(
      `/users/${userId}/add-roles`,
      { roles },
      {
        headers: getAuthorizationHeader({}),
      },
    );
  };

  addPermissionsToUser = async (permissions: string[], userId: string) => {
    return await this.instance.patch(
      `/users/${userId}/add-permissions`,
      { permissions },
      {
        headers: getAuthorizationHeader({}),
      },
    );
  };

  registerUser = async (data: z.infer<typeof RegisterFormSchema>) => {
    const { confirmPassword, ...rest } = data;

    const response = await this.instance.post(
      "/users/",
      { ...rest, roles: [], permissions: [] },
      { headers: getAuthorizationHeader({}) },
    );
    return response;
  };
}
