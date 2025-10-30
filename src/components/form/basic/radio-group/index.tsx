import {
  FormControlLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
  RadioGroupProps as MuiRadioGroupProps,
} from "@mui/material";
import { FormControl, FormControlProps } from "~/components/form/form-control";
import { forwardRef } from "react";
import { Dispatch, SetStateAction } from "react";
export type RadioOption<T> = {
  label: string;
  value: T;
};

export type RadioGroupProps<T extends string> = Omit<
  FormControlProps,
  "children"
> &
  Omit<MuiRadioGroupProps, "value" | "onChange" | "label"> & {
    value?: T | Array<T>;
    options: Array<RadioOption<T>>;
    onChange?: Dispatch<SetStateAction<T | Array<T>>>;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps<any>>(
  (
    {
      label,
      error,
      helperText,
      required,
      onChange,
      name,
      value,
      options,
      defaultValue,
    },
    ref
  ) => {
    const controlledValue = Array.isArray(value)
      ? value
      : value || defaultValue;
    return (
      <FormControl
        ref={ref}
        htmlFor={label}
        label={label}
        error={error}
        helperText={helperText}
        required={required}
      >
        <MuiRadioGroup
          defaultValue={defaultValue}
          name={name}
          value={controlledValue}
          onChange={(event) => {
            onChange?.(event.target.value);
          }}
        >
          {options.map((option) => {
            const isChecked = controlledValue === option.value;
            return (
              <FormControlLabel
                checked={isChecked}
                key={option.value}
                value={option.value}
                label={option.label}
                control={<Radio checked={isChecked} />}
              />
            );
          })}
        </MuiRadioGroup>
      </FormControl>
    );
  }
);
