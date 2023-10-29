import { EmployeeDeletePopUpButton } from "./EmployeeDeletePopUpButton";
import { EmployeeInfoPopUpButton } from "./EmployeeInfoPopUpButton";

const mock = new Array(20).fill(0).map((_, i) => {
  return {
    id: i.toString(),
    name: "김코딩",
    role: "개발자",
    password: "123456",
  };
});

export const EmployeeTable = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="fontSize-small flex rounded-[1rem] border border-main bg-bg py-[0.6rem] pl-[3.2rem] text-main">
        <div className="flex-1">이름</div>
        <div className="flex-1">역할</div>
        <div className="flex-[2]">ID</div>
        <div className="flex flex-1 justify-end text-right">
          <div className="w-[6rem] text-center"></div>
        </div>
      </div>

      <div className="h-full ">
        {mock.map((item) => {
          return (
            <div
              key={item.id}
              className="fontSize-regular flex border-b border-lgrey py-[1.8rem] pl-[3.2rem] text-black"
            >
              <div className="flex-1">{item.name}</div>
              <div className="flex-1">{item.role}</div>
              <div className="flex-[2]">{item.id}</div>
              <div className="flex flex-1 items-center justify-end gap-[2rem]">
                <EmployeeInfoPopUpButton
                  title="직원 정보 수정하기"
                  type="edit"
                  employee={item}
                />
                <EmployeeDeletePopUpButton />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
