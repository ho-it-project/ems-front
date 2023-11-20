interface Request {
  emergency_center_id: string;
  emergency_center_name: string;
  distance: number;
  reqeust_status: "REQUESTED" | "REJECTED";
}
const mock: Request[] = new Array(40).fill(0).map((_, i) => {
  return {
    emergency_center_id: i.toString(),
    emergency_center_name: "김코딩",
    distance: 100,
    reqeust_status: "REQUESTED",
  };
});

export const RequestTable = () => {
  return (
    <div className="h-full w-full">
      <div className="fontSize-small flex rounded-[1rem] border border-main bg-bg py-[0.6rem] pl-[3.2rem] text-main">
        <div className="flex-[5]">응급실</div>
        <div className="flex-1">거리</div>
        <div className="flex-1">상태</div>
      </div>
      <div className="h-full overflow-scroll ">
        {mock &&
          mock.map((item, i) => {
            return (
              <div
                key={i}
                className="fontSize-regular flex border-b border-lgrey py-[1.8rem] pl-[3.2rem] text-black"
              >
                <div className="flex-[5]">{item.emergency_center_name}</div>
                <div className="flex-1">{item.distance}</div>
                <div className="flex-1">{item.reqeust_status}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
