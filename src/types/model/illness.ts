export interface ServereIllness {
  servere_illness_id: string;
  servere_illness_name: string;
  status: "ACTIVE" | "INACTIVE";
}
export interface HospitalServereIllness {
  hospital_id: string;
  servere_illness_id: string;
  status: "ACTIVE" | "INACTIVE";
}
