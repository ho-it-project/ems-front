import { Try } from "../api";
import { Department } from "./client";

export type GetDepartmentResponse = Try<Department[]>;
