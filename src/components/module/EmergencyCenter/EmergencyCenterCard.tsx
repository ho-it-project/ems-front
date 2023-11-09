import { Tag } from "@/components/elements/Tag";

interface EmergencyCenterCardProps {
  emergency_center_name: string;
  emergency_center_type: string;
  distance: string;
  phone_number: string;
  emergency_center_address: string;
}

export const EmergencyCenterCard = ({
  emergency_center_name,
  emergency_center_type,
  distance,
  phone_number,
  emergency_center_address,
}: EmergencyCenterCardProps) => {
  return (
    <div className="flex w-full gap-[4rem] rounded-lg border border-main px-[4rem] py-[2.4rem]">
      <div className="flex max-w-[23rem] flex-[1]  flex-col gap-[0.6rem]">
        <h2 className="fontSize-xlarge flex-1">{emergency_center_name}</h2>
        <div className="fontSize-regular-l flex-1">{emergency_center_type}</div>
        <div className="fontSize-large flex flex-1 items-end">{distance}km</div>
      </div>
      <div className="flex flex-[2] flex-col">
        <div className="flex flex-1  flex-col gap-[0.8rem]">
          <div className="fontSize-regular-l flex flex-[1] items-center">
            {phone_number}
          </div>
          <div className="fontSize-regular-l flex flex-[2]  ">
            {emergency_center_address}
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-end">
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
