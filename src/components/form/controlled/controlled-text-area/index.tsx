import { TextArea, TextAreaProps } from "~/components/form/basic/text-area";
import { isRequired } from "~/components/form/validations";
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

export type ControlledTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = TextAreaProps &
  UseControllerProps<TFieldValues, TName> & {
    disableAutofill?: boolean;
  };

export const ControlledTextArea = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  disabled,
  required,
  rules,
  helperText,
  placeholder,
  InputProps,
  type,
  disableAutofill,
  variant,
  minRows,
  rows,
  multiline,
  fullWidth,
  onFocus,
}: ControlledTextFieldProps<TFieldValues, TName>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: {
      ...rules,
      required: isRequired(required),
    },
  });

  return (
    <TextArea
      fullWidth={fullWidth}
      multiline={multiline}
      rows={rows}
      minRows={minRows}
      variant={variant}
      ref={field.ref}
      value={field.value}
      onChange={field.onChange}
      onFocus={onFocus}
      error={Boolean(fieldState.error)}
      helperText={fieldState.error?.message || helperText}
      label={label}
      disabled={disabled}
      required={required}
      placeholder={placeholder}
      InputProps={InputProps}
      type={type}
      disableAutofill={disableAutofill}
    />
  );
};
