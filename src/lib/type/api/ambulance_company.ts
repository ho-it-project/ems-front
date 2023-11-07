import { Status, Try } from ".";

export type CompanyDetailResponse = Try<{
  ambulance_company_id: string;
  ambulance_company_name: string;
  ambulance_company_representative: string | null;
  ambulance_company_area: string;
  ambulance_company_address: string | null;
  ambulance_company_phone: string;
  created_at: Date;
  updated_at: Date;
  status: Status;
}>;
