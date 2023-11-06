import Joi from "joi";

const schema = Joi.object({
  NEXT_PUBLIC_NODE_ENV: Joi.string().valid("dev", "prod"),
  NEXT_PUBLIC_API_PREFIX: Joi.string(),
  NEXT_PUBLIC_PROTOCOL: Joi.string().valid("http", "https"),
  NEXT_PUBLIC_ROOT_DOMAIN: Joi.string(),
});

export const env = {
  NEXT_PUBLIC_NODE_ENV: (process.env.NEXT_PUBLIC_NODE_ENV || "prod") as
    | "dev"
    | "prod",
  NEXT_PUBLIC_API_PREFIX: process.env.NEXT_PUBLIC_API_PREFIX,
  NEXT_PUBLIC_PROTOCOL: process.env.NEXT_PUBLIC_PROTOCOL || "https",
  NEXT_PUBLIC_ROOT_DOMAIN: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
};

export function validateEnv() {
  const { error } = schema.validate(env);
  if (error) throw Error(error.message);
}
