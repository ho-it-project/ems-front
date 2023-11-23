import { validateEnv } from "./lib/utils/envValidation";

export function register() {
  validateEnv();
}
