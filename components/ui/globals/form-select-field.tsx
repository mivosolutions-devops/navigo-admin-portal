import type { FC } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../form";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

const FormFieldSelect: FC<{
  control: any;
  name: string;
  label?: string;
  placeholder: string;
  inputStyles?: string;
  options: string[];
  wrapperStyles: string;
}> = ({
  control,
  name,
  label,
  placeholder,
  inputStyles,
  options,
  wrapperStyles,
}) => {
  return (
    <FormField
      control={control as any}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-0", wrapperStyles)}>
          <FormLabel className={inputStyles}>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger
                className={cn(
                  "rounded-full ring-0 focus:ring-0 focus:ring-offset-0 text-gray-800 transition-all duration-800 focus:duration-0 bg-transparent border border-slate-400 w-[6rem] flex justify-between",
                  inputStyles,
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="min-w-[10rem] w-max">
              {options.map((option, idx) => {
                return (
                  <SelectItem value={option} key={option}>
                    {option}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldSelect;
