import { Checkbox, CheckboxProps } from "~/components/form/basic/checkbox";
import { isRequired } from "~/components/form/validations";
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

export type ControlledCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = CheckboxProps &
  UseControllerProps<TFieldValues, TName> & {
    labelPlacement?: "end" | "start" | "top" | "bottom" | undefined;
    checkboxColor?: string;
  };

/**
 * Type definition for the props accepted by the ControlledCheckbox component.
 * It extends CheckboxProps and UseControllerProps from 'react-hook-form'.
 *
 * @typedef {Object} ControlledCheckboxProps
 * @property {string} [label] - The label for the checkbox.
 * @property {string} [helperText] - Helper text to display below the checkbox.
 * @property {boolean} [required] - Indicates if the checkbox is required.
 * @property {boolean} [disabled] - Indicates if the checkbox is disabled.
 * @property {boolean} [checked] - Indicates if the checkbox is checked.
 * @property {string} [labelPlacement] - The placement of the label relative to the checkbox.
 * @property {string} [checkboxColor] - The color of the checkbox.
 */

/**
 * ControlledCheckbox component renders a checkbox with a label and validation.
 * It uses the Checkbox component from 'components/form/basic/checkbox' and integrates with react-hook-form for form state management.
 *
 * @component
 * @param {ControlledCheckboxProps} props - The props for the ControlledCheckbox component.
 * @param {string} [props.label] - The label for the checkbox.
 * @param {string} [props.helperText] - Helper text to display below the checkbox.
 * @param {boolean} [props.required] - Indicates if the checkbox is required.
 * @param {boolean} [props.disabled] - Indicates if the checkbox is disabled.
 * @param {boolean} [props.checked] - Indicates if the checkbox is checked.
 * @param {string} [props.labelPlacement] - The placement of the label relative to the checkbox.
 * @param {string} [props.checkboxColor] - The color of the checkbox.
 * @param {FieldPath<TFieldValues>} props.name - The name of the checkbox field.
 * @param {import('react-hook-form').Control<TFieldValues>} props.control - The control object from react-hook-form.
 * @param {import('react-hook-form').RegisterOptions} [props.rules] - Validation rules for the checkbox field.
 * @returns {JSX.Element} The rendered ControlledCheckbox component.
 */
export const ControlledCheckbox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  labelPlacement,
  fullWidth,
  disabled,
  required,
  checked,
  rules,
  inputProps,
  helperText,
  checkboxColor,
}: ControlledCheckboxProps<TFieldValues, TName>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: {
      ...rules,
      required: isRequired(required),
    },
  });

  return (
    <Checkbox
      {...field}
      value={field.value}
      name={field.name}
      error={Boolean(fieldState.error)}
      onChange={field.onChange}
      labelPlacement={labelPlacement}
      helperText={fieldState.error?.message || helperText}
      label={label}
      fullWidth={fullWidth}
      required={required}
      checked={checked}
      checkboxColor={checkboxColor}
      inputProps={inputProps}
      disabled={disabled}
    />
  );
};
