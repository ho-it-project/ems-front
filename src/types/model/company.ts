import { Model } from ".";

export type Company = Model<{
  ambulance_company_id: string;
  ambulance_company_name: string;
  ambulance_company_representative: string | null;
  ambulance_company_area: string;
  ambulance_company_address: string | null;
  ambulance_company_phone: string;
}>;
