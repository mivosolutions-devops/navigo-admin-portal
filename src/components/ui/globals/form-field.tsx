import type { FC } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "../form";
import { Input } from "../input";
import { cn } from "@/lib/utils";

const CustomFormField: FC<CustomFormFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  inputStyles,
  type,
  variant = "filled",
  wrapperStyles,
  labelStyles
}) => {
  const variants = {
    filled:
      "text-gray-800 transition-all duration-800 outline-none bg-transparent rounded-full ring-0 ring-offset-0 focus-visible:border-emerald-500 focus:border-emerald-500 focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-1 hover:border-green-500 py-6 px-6",
    outlined:
      "border-0 border-b rounded-none border-b-emerald-500 text-gray-800 focus-visible:ring-white focus:ring-0 transition-all duration-800 focus:duration-0 hover:border-b-2 pl-0 bg-transparent"
  };

  return (
    <FormField
      control={control as any}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(`w-full space-y-0`, wrapperStyles)}>
          <FormLabel className={labelStyles}>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type={type}
              className={cn(variants[variant], inputStyles)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
