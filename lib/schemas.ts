import { z } from "zod";

const passwordValidationSchema = z
  .string()
  .refine((value) => /(?=.*?[A-Z])/.test(value), {
    message: "password must have atleast one upper case letter",
  })
  .refine((value) => /(?=.*?[a-z])/.test(value), {
    message: "password must have atleast one lower case letter",
  })
  .refine((value) => /(?=.*?[0-9])/.test(value), {
    message: "password must have atleast one digit",
  })
  .refine((value) => /(?=.*?[#?!@$%^&*-])/.test(value), {
    message: "password must have one special character",
  })
  .refine((value) => /.{8,}/.test(value), {
    message: "password should be greater or equal to 8 character",
  });

const emailPasswordValidate = {
  email: z
    .string()
    .email({ message: "Invalid email, please input valid email" }),
  password: passwordValidationSchema,
};

export const RegisterFormSchema = z
  .object({
    firstName: z.string().min(3, {
      message: "First name must be greater than 2 characters",
    }),
    lastName: z.string().min(3, {
      message: "Last name must be greater than 2 characters",
    }),
    username: z.string().min(3, {
      message: "Last name must be greater than 2 characters",
    }),
    ...emailPasswordValidate,
    confirmPassword: passwordValidationSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const SignInFormSchema = z.object({
  ...emailPasswordValidate,
  password: z.string().min(1),
});

export const RecoverPasswordSchema = z.object({
  email: emailPasswordValidate.email,
});

export const OTPSchema = z.object({
  digit1: z.number(),
  digit2: z.number(),
  digit3: z.number(),
  digit4: z.number(),
});

export const NewPasswordFormSchema = z
  .object({
    password: passwordValidationSchema,
    confirmPassword: passwordValidationSchema,
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const DateFormSchema = z.object({
  timeInterval: z.string(),
});

export const AccountFormSchema = z.object({
  firstName: z.string().min(3, {
    message: "First name must be greater than 2 characters",
  }),
  lastName: z.string().min(3, {
    message: "Last name must be greater than 2 characters",
  }),
  email: z
    .string()
    .email({ message: "Invalid email, please input valid email" }),
  phoneNumber: z
    .string()
    .refine((value) => /^\+[1-9]{1}[0-9]{1,14}$/.test(value), {
      message: "Invalid phone number",
    }),
  profilePicture: z.any(),
});

export const RoleFormSchema = z.object({
  name: z.string().min(3, {
    message: "First name must be greater than 2 characters",
  }),
});

const permissionsObj = {
  slug: z.string().min(3, {
    message: "permission name (slug) must be greater than 2 characters",
  }),
  description: z.string().min(3, {
    message: "Permission description must be greater than 2 characters",
  }),
};

export const PermissionFormSchema = z.object(permissionsObj);

export const UpdatePermissionFormSchema = z.object(permissionsObj);
