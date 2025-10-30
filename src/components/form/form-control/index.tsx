import {
  FormControl as MuiFormControl,
  FormHelperText,
  InputLabel,
  Typography,
} from '@mui/material'
import { forwardRef } from 'react'

export type FormControlProps = {
  children: React.ReactNode
  htmlFor?: string
  label?: string
  helperText?: React.ReactNode
  error?: boolean
  required?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

/**
 * Type definition for the props accepted by the FormControl component.
 *
 * @typedef {Object} FormControlProps
 * @property {React.ReactNode} [children] - The children components or elements to be wrapped by the FormControl.
 * @property {string} [htmlFor] - The ID of the form control element that the label is associated with.
 * @property {string} [label] - The label text for the form control.
 * @property {React.ReactNode} [helperText] - The helper text to display below the form control.
 * @property {boolean} [error] - Indicates if there's an error with the form control.
 * @property {boolean} [required] - Indicates if the form control is required.
 * @property {boolean} [disabled] - Indicates if the form control is disabled.
 * @property {boolean} [fullWidth] - Indicates if the form control should take the full width of its container.
 */

/**
 * FormControl component wraps form control elements and provides label, helper text, and error handling.
 *
 * @component
 * @param {FormControlProps} props - The props for the FormControl component.
 * @param {React.ReactNode} [props.children] - The children components or elements to be wrapped by the FormControl.
 * @param {string} [props.htmlFor] - The ID of the form control element that the label is associated with.
 * @param {string} [props.label] - The label text for the form control.
 * @param {React.ReactNode} [props.helperText] - The helper text to display below the form control.
 * @param {boolean} [props.error] - Indicates if there's an error with the form control.
 * @param {boolean} [props.required] - Indicates if the form control is required.
 * @param {boolean} [props.disabled] - Indicates if the form control is disabled.
 * @param {boolean} [props.fullWidth] - Indicates if the form control should take the full width of its container.
 * @returns {JSX.Element} The rendered FormControl component.
 */
export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  (props: FormControlProps, ref) => {
    return (
      <MuiFormControl
        fullWidth={props.fullWidth}
        required={props.required}
        ref={ref}
        margin="none"
      >
        {props.label && (
          <InputLabel
            error={props.error}
            disableAnimation
            shrink
            htmlFor={props.htmlFor}
            required={props.required}
            sx={{
              transform: 'none',
              color: props.disabled ? 'text.disabled' : 'text.primary',
              ml: 2,
              mb: 0.5,
              position: 'static',
              fontSize: '14px',
              lineHeight: '17px',
              fontWeight: 400,
              zIndex: 0,
            }}
          >
            {props.label}
          </InputLabel>
        )}

        {props.children}

        <FormHelperText
          error={props.error}
          sx={{
            mt: 0.5,
            ml: 2,
            fontSize: '13px',
            color: theme => theme.palette.error.main,
          }}
        >
          <Typography fontSize={10} fontWeight={600}>
            {props.helperText || ''}
          </Typography>
        </FormHelperText>
      </MuiFormControl>
    )
  },
)
