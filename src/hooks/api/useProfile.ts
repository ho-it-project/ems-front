// import { useAuth } from "@/providers/AuthProvider";
// import { useProfileStore } from "@/store/profile.store";
// import { useEffect } from "react";
// import { useGetApi } from ".";

// export const useProfile = () => {
//   const { user } = useAuth();
//   const { profile, setCompany, setUser } = useProfileStore();

//   useEffect(() => {
//     if (user) {
//       setUser(user);
//     }
//   }, [user, setUser]);

//   const { data, error } = useGetApi(
//     "/ems/ambulance-companies/{ems_ambulance_company_id}",
//     {
//       params: {
//         path: {
//           ems_ambulance_company_id: user?.ambulance_company_id || "",
//         },
//       },
//     }
//   );
// };
