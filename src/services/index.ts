import { PermissionsService } from "./permissions.service";
import { RolesService } from "./roles.service";
import { UsersService } from "./users.service";

export const usersService = new UsersService(
  `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/`,
);
export const rolesService = new RolesService(
  `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/roles`,
);
export const permissionsService = new PermissionsService(
  `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/permissions`,
);
