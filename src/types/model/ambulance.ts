import { Model } from ".";

export type AmbulanceType =
  | "GENERAL"
  | "SPECIAL"
  | "BOX_TYPE"
  | "NEGATIVE_PRESSURE";

export type Ambulance = Model<{
  ambulance_id: string;
  ambulance_company_id: string;
  ambulance_type: AmbulanceType;
  ambulance_number: string;
}>;
