import Joi from "joi";

const schema = Joi.object({
  NEXT_PUBLIC_NODE_ENV: Joi.string().valid("dev", "prod"),
});

export const env = {
  NEXT_PUBLIC_NODE_ENV: (process.env.NEXT_PUBLIC_NODE_ENV || "prod") as
    | "dev"
    | "prod",
};

export function validateEnv() {
  const { error } = schema.validate(env);
  if (error) throw Error(error.message);
}
