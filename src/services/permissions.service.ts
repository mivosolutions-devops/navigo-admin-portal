import { AxiosInstance } from "axios";
import { z } from "zod";
import {
  PermissionFormSchema,
  UpdatePermissionFormSchema
} from "@/lib/schemas";
import { createAxiosInstance } from "@/lib/axios";

export class PermissionsService {
  protected instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = createAxiosInstance(url);
  }

  getPermissions = async ({
    limit = 10,
    page = 1,
    orderBy,
    orderDirection,
    search
  }: TParams) => {
    const params = {
      page,
      limit,
      search,
      orderBy,
      orderDirection
    };

    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined)
    );

    const response = await this.instance.get(`/`, {
      params: filteredParams
    });
    return response.data.payload;
  };

  createPermission = async (data: z.infer<typeof PermissionFormSchema>) => {
    return await this.instance.post("/", data);
  };

  deletePermission = async (id: string) => {
    return await this.instance.delete(`/${id}/delete-permission`);
  };

  updatePermission = async (
    id: string,
    data: z.infer<typeof UpdatePermissionFormSchema>
  ) => {
    return await this.instance.put(`/${id}/`, { ...data, status: true });
  };
}
