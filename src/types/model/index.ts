export type Status = "ACTIVE" | "INACTIVE" | "DELETED";
export type Model<T> = T & {
  created_at: string;
  updated_at: string;
  status: Status;
};

export * from "./ambulance";
export * from "./company";
