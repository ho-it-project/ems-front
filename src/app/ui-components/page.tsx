import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";

export default function UiComponents() {
  return (
    <div className="font-large-x">
      <button className="font-small rounded-[1.4rem] bg-main px-[4rem] py-[1.2rem]">
        저장하기
      </button>
      <Button text="저장하기" />
      <div className="width-[100px] height-[100px] p-[5rem]">
        <Input
          value=""
          rounded="nomal"
          placeholder="ID를 입력하세요"
          fontSize="large"
          width="w-[30rem]"
        />
      </div>
    </div>
  );
}
