import { Tag } from "@/components/elements/Tag";
import {
  EMERGENCY_CENTER_TYPE,
  EmergencyCenter,
} from "@/store/emergencyCenter.store";

interface EmergencyCenterCardProps {
  emergencyCenter: EmergencyCenter;
}

export const EmergencyCenterCard = ({
  emergencyCenter,
}: EmergencyCenterCardProps) => {
  const {
    emergency_center_name,
    emergency_center_type,
    distance,
    emergency_center_primary_phone,
    emergency_center_address,
  } = emergencyCenter;
  console.log(emergencyCenter);
  return (
    <div className="flex w-full gap-[4rem] rounded-lg border border-main px-[4rem] py-[2.4rem]">
      <div className="flex max-w-[23rem] flex-[1]  flex-col gap-[0.6rem]">
        <h2 className="fontSize-xlarge flex-1">{emergency_center_name}</h2>
        <div className="fontSize-regular-l flex-1">
          {EMERGENCY_CENTER_TYPE[emergency_center_type]}
        </div>
        <div className="fontSize-large flex flex-1 items-end text-main">
          {(Number(distance) / 1000).toFixed(2)}km
        </div>
      </div>
      <div className="flex flex-[2] flex-col">
        <div className="flex flex-1  flex-col gap-[0.8rem]">
          <div className="fontSize-regular-l flex flex-[1] items-center">
            {emergency_center_primary_phone}
          </div>
          <div className="fontSize-regular-l flex flex-[2]  ">
            {emergency_center_address}
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-end">
          {
            //TODO: 수용가능한 병실 표시
          }
          <div>
            <Tag
              text="일반"
              width="w-fit"
              className="mr-[1rem] inline-block px-[1rem] py-[0.4rem]"
            />
            <Tag
              text="코호트"
              width="w-fit"
              className="mr-[1rem] inline-block px-[1rem] py-[0.4rem]"
            />
            <Tag
              text="음압"
              width="w-fit"
              className="mr-[1rem] inline-block px-[1rem] py-[0.4rem]"
            />
            <Tag
              text="일반격리"
              width="w-fit"
              className="mr-[1rem] inline-block px-[1rem] py-[0.4rem]"
            />
            <Tag
              text="소아음압격리"
              width="w-fit"
              className="mr-[1rem] inline-block px-[1rem] py-[0.4rem]"
            />
            <Tag
              text="소아일반격리"
              width="w-fit"
              className="mr-[1rem] inline-block px-[1rem] py-[0.4rem]"
            />
            <Tag
              text="소아"
              width="w-fit"
              className="mr-[1rem] inline-block px-[1rem] py-[0.4rem]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
