import { getAuthorizationHeader } from "@/lib/utils";
import axios, { AxiosInstance } from "axios";
import fetchAdapter from "@haverstack/axios-fetch-adapter";
import { z } from "zod";
import {
  PermissionFormSchema,
  UpdatePermissionFormSchema,
} from "@/lib/schemas";

export class PermissionsService {
  protected instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
      adapter: fetchAdapter,
    });
  }

  getPermissions = async ({
    limit = 10,
    page = 1,
    orderBy,
    orderDirection,
    search,
  }: TParams) => {
    const params = {
      page,
      limit,
      search,
      orderBy,
      orderDirection,
    };

    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined),
    );

    const response = await this.instance.get(`/`, {
      headers: getAuthorizationHeader({}),
      params: filteredParams,
    });
    return response.data.payload;
  };

  createPermission = async (data: z.infer<typeof PermissionFormSchema>) => {
    return await this.instance.post("/", data, {
      headers: getAuthorizationHeader({}),
    });
  };

  deletePermission = async (id: string) => {
    return await this.instance.delete(`/${id}/delete-permission`, {
      headers: getAuthorizationHeader({}),
    });
  };

  updatePermission = async (
    id: string,
    data: z.infer<typeof UpdatePermissionFormSchema>,
  ) => {
    return await this.instance.put(
      `/${id}/`,
      { ...data, status: true },
      {
        headers: getAuthorizationHeader({}),
      },
    );
  };
}
