export type DCAP_BTLS_AffectArea =
  | "HEAD"
  | "NECK"
  | "CHEST"
  | "ABDOMEN"
  | "LEFT_ARM"
  | "RIGHT_ARM"
  | "LEFT_LEG"
  | "RIGHT_LEG"
  | "BACK"
  | "PELVIS"
  | "UNKNOWN";

export type DCAP_BTLS_AffectAreaKor =
  | "머리"
  | "목"
  | "가슴"
  | "복부"
  | "왼팔"
  | "오른팔"
  | "왼쪽다리"
  | "오른쪽다리"
  | "등"
  | "골반"
  | "알수없음";

export const DCAP_BTLS_AFFECT_AREA_KOR: {
  [key in DCAP_BTLS_AffectArea]: DCAP_BTLS_AffectAreaKor;
} = {
  UNKNOWN: "알수없음",
  HEAD: "머리",
  NECK: "목",
  CHEST: "가슴",
  ABDOMEN: "복부",
  LEFT_ARM: "왼팔",
  RIGHT_ARM: "오른팔",
  LEFT_LEG: "왼쪽다리",
  RIGHT_LEG: "오른쪽다리",
  BACK: "등",
  PELVIS: "골반",
};

export interface DCAP_BTLS_AFFECT {
  deformity: boolean;
  contusion: boolean;
  abrasion: boolean;
  puncture: boolean;
  burn: boolean;
  tenderness: boolean;
  laceration: boolean;
  swelling: boolean;
}

export const DCAP_BTLS_AFFECT_KOR: {
  [kye in keyof DCAP_BTLS_AFFECT]: string;
} = {
  deformity: "변형",
  contusion: "타박상",
  abrasion: "찰과상",
  puncture: "찌름상",
  burn: "화상",
  tenderness: "압통",
  laceration: "열상",
  swelling: "부종",
};
export const DCAP_BTLS_AFFECT_KEYS: (keyof DCAP_BTLS_AFFECT)[] = [
  "deformity",
  "contusion",
  "abrasion",
  "puncture",
  "burn",
  "tenderness",
  "laceration",
  "swelling",
];
