"use client";
import { TabWrapper } from "@/components/layout/TabWrapper";
import { AmbulanceDriverPrototype } from "@/components/prototypes/Ambulance/Driver";

type Params = {
  ambulance_id: string;
};

// const mock = new Array(22).fill(0).map((_, i) => {
//   return {
//     employee_id: i.toString(),
//     employee_name: "김코딩",
//     role: "ADMIN" as const,
//     id_card: "ADMIN",
//     ambulance_company_id: "hmmm",
//   };
// });

export default function Page({ params }: { params: Params }) {
  const { ambulance_id } = params;
  // const { detail, errorOnDetail, refetch } = useAmbulanceDetail(ambulance_id);

  // const { setAmbulance, setRefetch } = useAmbulanceDriverStore(
  //   useShallow((state) => ({
  //     setAmbulance: state.setAmbulance,
  //     setRefetch: state.setRefetch,
  //   }))
  // );
  // useEffect(() => {
  //   if (detail) setAmbulance({ ...detail });
  //   if (refetch) setRefetch(refetch);
  //   // return () => console.log("i am unmounting");
  // }, [detail, errorOnDetail, refetch]);

  // if (errorOnDetail?.http_status_code === 404)
  //   return <NotFoundPopUpContainer />;

  return (
    <>
      {/* {detail && ( */}
      <TabWrapper
        contents={[
          {
            title: "담당기사 배치하기",
            content: <AmbulanceDriverPrototype ambulance_id={ambulance_id} />,
          },
        ]}
      />
      {/* )} */}
    </>
  );
}
