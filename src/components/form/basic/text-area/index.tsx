import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import { FormControl, FormControlProps } from "~/components/form/form-control";
import { forwardRef } from "react";

export type TextAreaProps = Omit<FormControlProps, "children"> &
  MuiTextFieldProps & {
    disableAutofill?: boolean;
  };

export const TextArea = forwardRef<HTMLDivElement, TextAreaProps>(
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
        required={required}
        disabled={textFieldProps.disabled}
      >
        <MuiTextField
          label={label}
          ref={ref}
          {...textFieldProps}
          error={error}
          type={textFieldProps.type}
          inputProps={{ maxLength: 150_000 }}
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
