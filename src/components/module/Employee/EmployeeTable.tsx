import { usePutApi } from "@/hooks/api";
import { Response } from "@/types/api";
import { Employee, EmployeeEdit } from "@/types/model/employee";
import { useState } from "react";
import { EmployeeDeletedPopUp } from "./EmployDeletedPopUp";
import { EmployeeDeletePopUpButton } from "./EmployeeDeletePopUpButton";
import { EmployeeInfoPopUpButton } from "./EmployeeInfoPopUpButton";

export const EmployeeTable = ({
  data,
  refetch,
}: {
  data: Employee[];
  refetch: () => unknown;
}) => {
  const [deletedData, setDeletedData] =
    useState<Response<"/ems/employees/{employee_id}", "put">>();
  const { mutate } = usePutApi("/ems/employees/{employee_id}", {
    useLoader: true,
  });

  const onSubmit = async (EmployeeInfo: EmployeeEdit) => {
    //api 없음. user page에서 수정할 사항
    EmployeeInfo;
    return true;
  };

  return (
    <div className="flex h-full w-full flex-col overflow-auto">
      <div className="fontSize-small flex rounded-[1rem] border border-main bg-bg py-[0.6rem] pl-[3.2rem] text-main">
        <div className="flex-1">이름</div>
        <div className="flex-1">역할</div>
        <div className="flex-[2]">ID</div>
        <div className="flex flex-1 justify-end text-right">
          <div className="w-[6rem] text-center"></div>
        </div>
      </div>

      <div className="h-full ">
        {data &&
          data.map((item) => {
            return (
              <div
                key={item.id_card}
                className="fontSize-regular flex border-b border-lgrey py-[1.8rem] pl-[3.2rem] text-black"
              >
                <div className="flex-1">{item.employee_name}</div>
                <div className="flex-1">{item.role}</div>
                <div className="flex-[2]">{item.id_card}</div>
                <div className="flex flex-1 items-center justify-end gap-[2rem]">
                  <EmployeeInfoPopUpButton
                    title="직원 정보 수정하기"
                    type="edit"
                    // employee={{ ...item, password: "" }}
                    employee={{ ...item }}
                    onSubmit={onSubmit}
                    submitButtonName="수정하기"
                  />
                  <EmployeeDeletePopUpButton
                    onSubmmit={async () => {
                      const result = await mutate({
                        params: { path: { employee_id: item.employee_id } },
                      });
                      setDeletedData(result);
                    }}
                  />
                  <EmployeeDeletedPopUp
                    data={deletedData}
                    onClose={() => {
                      setDeletedData(undefined);
                      refetch();
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
