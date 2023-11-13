import { Ambulance } from "../model/ambulance";
import { Company } from "../model/company";

export interface CompanyDetailReturn extends Company {
  ambulances: Ambulance[];
}
