"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import React from "react";
import { DayPickerSingleProps } from "react-day-picker";

const DateWrapper = ({ date }: { date: Date }) => {
  const [year, month, day] = format(date, "yyyy-MM-dd").split("-");
  return (
    <span className="fontSize-medium">
      <span>
        <span className="text-black">{year}&nbsp;</span>
        <span className="text-main">년&nbsp;&nbsp;</span>
      </span>
      <span>
        <span className="text-black">{month}&nbsp;</span>
        <span className="text-main">월&nbsp;&nbsp;</span>
      </span>
      <span>
        <span className="text-black">{day}&nbsp;</span>
        <span className="text-main">일</span>
      </span>
    </span>
  );
};

export const CalendarSelector = ({
  selected,
  className,
  ...props
}: Omit<DayPickerSingleProps, "mode">) => {
  const [open, setOpen] = React.useState(false);
  const closeHandler = () => setOpen(false);
  const openHandler = () => setOpen(true);
  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "fontSize-large h-full w-full text-left",
            !selected && "text-muted-foreground",
            className
          )}
          onClick={openHandler}
        >
          {selected ? (
            <DateWrapper date={selected} />
          ) : (
            // <span className="fontSize-large">
            //   {format(selected, "yyyy년 MM월 dd일")}
            // </span>
            <span>0000년 00월 00일</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
          formatters={{
            formatWeekdayName: (day) =>
              format(day, "EEEEE", {
                locale: ko,
              }),
            formatCaption: (month) =>
              format(month, "yyyy년 MM월", {
                locale: ko,
              }),
          }}
          locale={ko}
          onDayClick={closeHandler}
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
};
