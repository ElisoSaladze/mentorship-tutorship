const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,100}$/
const emailRegex =
  /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/
const numberRegex = /^\d+$/
const firstNameRegex = /^[ A-Za-z-]+$/
const lastNameRegex = /^[ A-Za-z-]+$/
const phoneNumberRegex = /^(?:\d{3}-\d{3}-\d{4}|\(\d{3}\) \d{3}-\d{4})$/

export const isRequired = (required: boolean = false) =>
  required && 'This field is required'

export const phoneNumber = {
  pattern: {
    value: phoneNumberRegex,
    message: 'Please Enter Valid Number',
  },
}
export const number = {
  pattern: {
    value: numberRegex,
    message: 'field must contains only numbers',
  },
}
export const email = {
  pattern: {
    value: emailRegex,
    message: 'Please enter a valid email address',
  },
}
export const lastName = {
  pattern: {
    value: lastNameRegex,
    message: 'last name must contain only letters',
  },
}
export const firstName = {
  pattern: {
    value: firstNameRegex,
    message: 'first name must contain only letters',
  },
}

export const password = {
  pattern: {
    value: passwordRegex,
    message:
      'Required at least: 8 characters, a digit, and an uppercase letter.',
  },
}
