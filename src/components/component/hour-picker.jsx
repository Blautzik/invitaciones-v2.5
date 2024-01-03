
import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { useState } from "react";

export function HourPicker({setSelectedHour, setSelectedMinute, selectedHour, selectedMinute }) {


  const handleHourChange = (value) => {
    setSelectedHour(value);
  };


  const handleMinuteChange = (value) => {
    setSelectedMinute(value);
  };



  return (
    <div className="h-4 w-4 esta">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-[280px] mb-4 pl-5 justify-start text-left font-normal" variant="outline">
            <ClockIcon className="mr-1 h-4 w-4 -translate-x-1" />
            { selectedHour == "00" ? "Elegí la hora" : selectedHour + ":" +selectedMinute}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-2 bg-white flex justify-between space-x-2">
          <Select  onValueChange={(value) => handleHourChange(value)}>
            <SelectTrigger aria-label="Hour">
              <SelectValue placeholder="Hora" />
            </SelectTrigger>
            <SelectContent className="bg-white"
            ref={(ref) => ref?.addEventListener('touchend', (e) => e.preventDefault())}
            >
              {[...Array(24).keys()].map((hour) => (
                <SelectItem key={hour} value={hour.toString().padStart(2, '0')}>
                  {hour.toString().padStart(2, '0')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => handleMinuteChange(value)}> 
            <SelectTrigger aria-label="Minute">
              <SelectValue placeholder="Minutos" />
            </SelectTrigger>
            <SelectContent className="bg-white"
            ref={(ref) => ref?.addEventListener('touchend', (e) => e.preventDefault())}
            >
              <SelectItem value="00">00</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="45">45</SelectItem>
            </SelectContent>
          </Select>
          
        </PopoverContent>
      </Popover>
    </div>
  )
}




function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
