"use client"
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { es } from "date-fns/locale"; // Import Spanish locale
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";

export function DatePicker({setFecha}) {
  const [date, setDate] = useState();




  useEffect(() => {
    setFecha(date)
    format(new Date(), "PPP", { locale: es });
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: es }) : <span>Elegí el día</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 flex flex-col items-center justify-center">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={es} />
        <PopoverClose asChild className="w-[80%] justify-center">
            <Button variant={"outline"} className="m-2">Confirmar</Button>
        </PopoverClose>
        
      </PopoverContent>
    </Popover>
  );
}
