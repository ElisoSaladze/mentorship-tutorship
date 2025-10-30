import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel,
} from "@mui/material";
import { FormControl, FormControlProps } from "~/components/form/form-control";
import { forwardRef } from "react";

export type CheckboxProps = Omit<FormControlProps, "children"> &
  MuiCheckboxProps & {
    labelPlacement?: "end" | "start" | "top" | "bottom" | undefined;
    checkboxColor?: string;
  };

/**
 * Type definition for the props accepted by the Checkbox component.
 * It extends Omit<FormControlProps, 'children'> and MuiCheckboxProps.
 *
 * @typedef {Object} CheckboxProps
 * @property {string} [label] - The label for the checkbox.
 * @property {boolean} [error] - Indicates if there is an error.
 * @property {'end' | 'start' | 'top' | 'bottom'} [labelPlacement] - The position of the label relative to the checkbox.
 * @property {string} [helperText] - Helper text to display below the checkbox.
 * @property {boolean} [required] - Indicates if the checkbox is required.
 * @property {boolean} [checked] - Indicates if the checkbox is checked.
 * @property {boolean} [defaultChecked] - default value of checkbox.
 * @property {(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void} [onChange] - The callback fired when the state is changed.
 * @property {string} [name] - Name attribute of the input element.
 * @property {any} [value] - The value of the checkbox.
 * @property {string} [checkboxColor] - Custom color for the checkbox.
 */

/**
 * Checkbox component renders a styled checkbox with a label and optional error, helper text, and custom color.
 *
 * @component
 * @param {CheckboxProps} props - The props for the Checkbox component.
 * @param {string} [props.label] - The label for the checkbox.
 * @param {boolean} [props.error] - Indicates if there is an error.
 * @param {'end' | 'start' | 'top' | 'bottom'} [props.labelPlacement] - The position of the label relative to the checkbox.
 * @param {string} [props.helperText] - Helper text to display below the checkbox.
 * @param {boolean} [props.required] - Indicates if the checkbox is required.
 * @param {boolean} [props.checked] - Indicates if the checkbox is checked.
 * @param {(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void} [props.onChange] - The callback fired when the state is changed.
 * @param {string} [props.name] - Name attribute of the input element.
 * @param {any} [props.value] - The value of the checkbox.
 * @param {string} [props.checkboxColor] - Custom color for the checkbox.
 * @returns {JSX.Element} The rendered Checkbox component.
 */
export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  (
    {
      label,
      error,
      labelPlacement,
      helperText,
      required,
      defaultChecked,
      checked,
      onChange,
      name,
      value,
      ...checkboxProps
    },
    ref
  ) => {
    return (
      <FormControl
        fullWidth={checkboxProps.fullWidth}
        ref={ref}
        htmlFor={label}
        error={error}
        helperText={helperText}
        required={required}
        disabled={checkboxProps.disabled}
      >
        <FormControlLabel
          value="end"
          sx={{ color: checkboxProps.checkboxColor, margin: "0" }}
          control={
            <MuiCheckbox
              size="small"
              defaultChecked={defaultChecked}
              {...checkboxProps}
              value={value}
              checked={checked}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onChange?.(event, event.target.checked);
              }}
              sx={{
                color: checkboxProps.checkboxColor,
                "&.Mui-checked": {
                  color: checkboxProps.checkboxColor,
                },
              }}
              name={name}
            />
          }
          label={label}
          labelPlacement={labelPlacement}
        />
      </FormControl>
    );
  }
);
