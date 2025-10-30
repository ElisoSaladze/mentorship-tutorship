import {
  InputLabel,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import { FormControl, FormControlProps } from "~/components/form/form-control";
import { forwardRef } from "react";

export type TextFieldProps = Omit<FormControlProps, "children"> &
  MuiTextFieldProps & {
    disableAutofill?: boolean;
  };

/**
 * Type definition for the props accepted by the TextField component.
 * It extends Omit<FormControlProps, 'children'> and MuiTextFieldProps.
 *
 * @typedef {Object} TextFieldProps
 * @property {string} [htmlFor] - The id of the element this label is bound to.
 * @property {string} [label] - The label for the text field.
 * @property {boolean} [error] - Indicates if there is an error.
 * @property {string} [helperText] - Helper text to display below the text field.
 * @property {boolean} [required] - Indicates if the text field is required.
 * @property {boolean} [disableAutofill] - If true, disables autofill for the text field.
 */

/**
 * TextField component renders a text input field with a label and error handling.
 * It uses the MuiTextField component from '@mui/material' and a custom FormControl.
 *
 * @component
 * @param {TextFieldProps} props - The props for the TextField component.
 * @param {string} [props.htmlFor] - The id of the element this label is bound to.
 * @param {string} [props.label] - The label for the text field.
 * @param {boolean} [props.error] - Indicates if there is an error.
 * @param {string} [props.helperText] - Helper text to display below the text field.
 * @param {boolean} [props.required] - Indicates if the text field is required.
 * @param {boolean} [props.disableAutofill] - If true, disables autofill for the text field.
 * @returns {JSX.Element} The rendered TextField component.
 */
export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  (
    {
      htmlFor,
      label,
      error,
      helperText,
      required,
      disableAutofill,
      ...textFieldProps
    },
    ref
  ) => {
    return (
      <FormControl
        htmlFor={htmlFor}
        error={error}
        fullWidth={textFieldProps.fullWidth}
        helperText={helperText}
        disabled={textFieldProps.disabled}
      >
        <InputLabel shrink>{label}</InputLabel>
        <MuiTextField
          sx={{
            mt: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
          ref={ref}
          size="small"
          required={required}
          // label={label}
          {...textFieldProps}
          error={error}
          type={textFieldProps.type}
          InputProps={{
            className: "textField",
            ...textFieldProps.InputProps,
          }}
          inputProps={{
            maxLength: 150,
            enterKeyHint: "done",
          }}
          {...(disableAutofill
            ? {
                inputProps: textFieldProps.inputProps,
              }
            : undefined)}
        />
      </FormControl>
    );
  }
);
