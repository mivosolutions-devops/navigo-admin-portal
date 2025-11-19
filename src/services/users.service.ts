import { AxiosInstance } from "axios";
import { z } from "zod";
import { RegisterFormSchema } from "@/lib/schemas";
import { createAxiosInstance } from "@/lib/axios";

export class UsersService {
  protected instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = createAxiosInstance(url);
  }

  getUsers = async (
    { limit = 10, page = 1, orderBy, orderDirection, search }: TParams,
    options?: Record<string, boolean>
  ) => {
    const params = {
      page,
      limit,
      search,
      orderBy,
      orderDirection,
      ...options
    };

    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined)
    );

    const response = await this.instance.get(`/users`, {
      params: filteredParams
    });

    return response.data.payload;
  };

  getMe = async () => {
    const response = await this.instance.get(`/profiles/get-profile`);
    return response;
  };

  getUser = async (id: string, options: Record<string, boolean>) => {
    const params: Record<string, boolean> = {};

    Object.keys(options).forEach((key) => {
      if (options[key] !== undefined) params[key] = options[key];
    });

    const response = await this.instance.get(`/users/${id}`, {
      params
    });

    return response.data.payload;
  };

  addRolesToUser = async (roles: string[], userId: string) => {
    return await this.instance.patch(`/users/${userId}/add-roles`, { roles });
  };

  addPermissionsToUser = async (permissions: string[], userId: string) => {
    return await this.instance.patch(`/users/${userId}/add-permissions`, {
      permissions
    });
  };

  registerUser = async (data: z.infer<typeof RegisterFormSchema>) => {
    const { ...rest } = data;

    const response = await this.instance.post("/users/", {
      ...rest,
      roles: [],
      permissions: []
    });
    return response;
  };
}
