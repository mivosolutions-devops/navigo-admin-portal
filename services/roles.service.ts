import { getAuthorizationHeader } from "@/lib/utils";
import axios, { AxiosInstance } from "axios";
import fetchAdapter from "@haverstack/axios-fetch-adapter";

export class RolesService {
  protected instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
      adapter: fetchAdapter,
    });
  }

  getRoles = async (
    { limit = 10, page = 1, orderBy, orderDirection, search }: TParams,
    options?: Record<string, boolean>,
  ) => {
    const params: Record<string, any> = {
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

    const response = await this.instance.get(`/`, {
      headers: getAuthorizationHeader({}),
      params: filteredParams,
    });

    return response.data.payload;
  };

  createRole = async (name: string) => {
    return await this.instance.post(
      "/",
      {
        name,
        permissions: [],
      },
      { headers: getAuthorizationHeader({}) },
    );
  };

  addPermissions = async (permissions: string[], roleId: string) => {
    return await this.instance.patch(
      `/${roleId}/add-permissions`,
      { permissions },
      {
        headers: getAuthorizationHeader({}),
      },
    );
  };

  deleteRole = async (id: string) => {
    return await this.instance.delete(`/${id}/delete-role`, {
      headers: getAuthorizationHeader({}),
    });
  };

  removePermissionsFromRole = async (roleId: string, permissions: string[]) => {
    return await this.instance.patch(
      `/${roleId}/remove-permissions`,
      { permissions },
      { headers: getAuthorizationHeader({}) },
    );
  };
}
