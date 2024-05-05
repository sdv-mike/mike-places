import clsx from "clsx"
import { ErrorMessage, Field } from "formik"
import { twMerge } from "tailwind-merge"

export const FormField = ({
  className,
  name,
  label,
  placeholder,
  ...otherProps
}) => (
  <label className={twMerge(clsx("flex flex-col gap-2", className))}>
    <span>{label}</span>
    <Field
      name={name}
      className="border-2 focus:border-indigo-400 outline-none px-3 py-2"
      placeholder={placeholder || label}
      {...otherProps}
    />
    <ErrorMessage
      component="span"
      className="text-sm text-red-500"
      name={name}
    />
  </label>
)
