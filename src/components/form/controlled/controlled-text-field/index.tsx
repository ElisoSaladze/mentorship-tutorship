import { TextField, TextFieldProps } from "~/components/form/basic/text-field";
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
> = TextFieldProps &
  UseControllerProps<TFieldValues, TName> & {
    disableAutofill?: boolean;
    onChange?: (value: string) => void; // Define onChange prop
  };

/**
 * Type definition for the props accepted by the ControlledTextField component.
 * It extends TextFieldProps and UseControllerProps from 'react-hook-form'.
 *
 * @typedef {Object} ControlledTextFieldProps
 * @property {string} [label] - The label for the text field.
 * @property {boolean} [required] - Indicates if the text field is required.
 * @property {boolean} [disabled] - Indicates if the text field is disabled.
 * @property {string} [placeholder] - The placeholder text for the text field.
 * @property {React.InputHTMLAttributes<HTMLInputElement>['type']} [type] - The type of the input field.
 * @property {boolean} [disableAutofill] - Indicates if autofill should be disabled for the text field.
 * @property {(value: string) => void} [onChange] - Custom onChange handler for the text field.
 */

/**
 * ControlledTextField component renders a text field with a label and validation.
 * It uses the TextField component from 'components/form/basic/text-field' and integrates with react-hook-form for form state management.
 *
 * @component
 * @param {ControlledTextFieldProps} props - The props for the ControlledTextField component.
 * @param {string} [props.label] - The label for the text field.
 * @param {boolean} [props.required] - Indicates if the text field is required.
 * @param {boolean} [props.disabled] - Indicates if the text field is disabled.
 * @param {string} [props.placeholder] - The placeholder text for the text field.
 * @param {React.InputHTMLAttributes<HTMLInputElement>['type']} [props.type] - The type of the input field.
 * @param {boolean} [props.disableAutofill] - Indicates if autofill should be disabled for the text field.
 * @param {(value: string) => void} [props.onChange] - Custom onChange handler for the text field.
 * @param {FieldPath<TFieldValues>} props.name - The name of the text field.
 * @param {import('react-hook-form').Control<TFieldValues>} props.control - The control object from react-hook-form.
 * @param {import('react-hook-form').RegisterOptions} [props.rules] - Validation rules for the text field.
 * @returns {JSX.Element} The rendered ControlledTextField component.
 */
export const ControlledTextField = <
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
  fullWidth,
  placeholder,
  InputProps,
  type,
  disableAutofill,
  onChange,
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event); // Invoke original onChange
    if (onChange) {
      onChange(event.target.value); // Invoke provided onChange
    }
  };
  return (
    <TextField
      fullWidth={fullWidth}
      ref={field.ref}
      value={field.value}
      onChange={handleChange}
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
