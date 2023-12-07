export interface Hospital {
  hospital_id: string;
  hospital_name: string;
  hospital_address: string;
  hospital_phone: string | null;
  hospital_city: string;
  hospital_district: string;
  latitude: number | null;
  longitude: number | null;
}
