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
          rounded="large"
          placeholder="검색하기"
          fontSize="medium"
          width="w-[30rem]"
          placeholderColor="main"
          textLocation="left"
          // img="/icon/icon-search.png"
        />
      </div>
    </div>
  );
}
