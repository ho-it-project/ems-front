import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Nav } from "./Nav";

export const SlideNav = () => {
  return (
    <Sheet>
      <SheetTrigger
        className="fixed bottom-[3.6rem] flex h-[6rem] w-[6rem] items-center justify-center rounded-sm bg-white shadow-sm"
        aria-controls="menu"
      >
        <Image
          src={"/icon/double-arrow.svg"}
          width={36}
          height={36}
          alt="menu"
        />
      </SheetTrigger>
      <SheetContent side={"left"} className="flex justify-center bg-bg">
        <Nav shadow="large" />
      </SheetContent>
      <SheetClose className="bg-blue" />
    </Sheet>
  );
};
