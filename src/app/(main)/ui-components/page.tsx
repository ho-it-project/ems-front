import { Button } from "@/components/elements/Button";
import { Input } from "@/components/elements/Input";
import { Tag } from "@/components/elements/Tag";
import { Toggle } from "@/components/elements/Toggle";

export default function UiComponents() {
  return (
    <div className="font-large-x">
      <button className="font-small rounded-lg bg-main px-[4rem] py-[1.2rem]">
        저장하기
      </button>
      <Button text="저장하기" />
      <div className="width-[100px] height-[100px] p-[5rem]">
        <Input
          value=""
          rounded="large"
          placeholder="검색하기"
          fontSize="medium"
          width="w-[30rem]"
          placeholderColor="main"
          textLocation="left"
          // img="/icon/icon-search.png"
        />
      </div>
      <div>
        <Tag text="초대중" border="none" color="black" />
        <Tag text="초대" bgColor="main" color="white" />
        <Tag text="초대완료" />
        <Tag text="경고" bgColor="red" color="yellow" border="none" />
        <Tag text="한세종" />
      </div>
      <div className="m-20">
        <div className="p-20">
          <Toggle
            id={"1"}
            noneCheckedColor="lgrey"
            checkedColor="main"
            checked={true}
          />
          <Toggle
            id={"2"}
            noneCheckedColor="yellow"
            checkedColor="main"
            checked={false}
          />
          <Toggle id={"3"} checked={false} />
        </div>
        <div className="p-20">
          <Toggle
            id={"4"}
            size="small"
            noneCheckedColor="lgrey"
            checkedColor="main"
            checked={true}
          />
          <Toggle
            id={"5"}
            size="small"
            noneCheckedColor="yellow"
            checkedColor="main"
            checked={false}
          />
          <Toggle id={"6"} size="small" checked={false} />
        </div>
        <div className="p-20">
          <Toggle
            id={"7"}
            size="large"
            noneCheckedColor="main"
            checkedColor="main"
            checked={true}
          />
          <Toggle
            id={"8"}
            size="large"
            noneCheckedColor="main"
            checkedColor="main"
            textOnButton={true}
            texts={["좌측", "우측"]}
            checked={false}
          />{" "}
          <Toggle
            id={"9"}
            size="large"
            noneCheckedColor="main"
            checkedColor="main"
            textOnButton={true}
            texts={["좌측", "우측"]}
            checked={true}
          />
          <Toggle
            id={"10"}
            size="large"
            noneCheckedColor="main"
            checkedColor="main"
            texts={["좌측", "우측"]}
            checked={false}
          />
          <Toggle
            id={"11"}
            size="large"
            noneCheckedColor="main"
            checkedColor="main"
            texts={["좌측", "우측"]}
            checked={true}
          />
        </div>
      </div>
    </div>
  );
}
