import { CredentialsInput, Event, ValidationErrors } from "../types/interfaces";

function isValidEmail(value: string): boolean {
    return value.trim().includes("@");
}

function isValidPassword(value: string): boolean {
    return value.trim().length >= 6;
}
  
export function validateCredentials(password: string) {
    const validationErrors: ValidationErrors = {};
  
    if (!isValidPassword(password)) {
      validationErrors.password =
        "Invalid password. Must be at least 7 characters long.";
    }
  
    if (Object.keys(validationErrors).length > 0) {
      return validationErrors;
    }
}
  