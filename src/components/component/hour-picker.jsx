
import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"

export function HourPicker() {
  return (
    <div className="h-4 w-4 esta">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-[280px] mb-4 pl-5 justify-start text-left font-normal" variant="outline">
            <ClockIcon className="mr-1 h-4 w-4 -translate-x-1" />
            Elegí la hora
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-2 bg-white flex justify-between space-x-2">
          <Select>
            <SelectTrigger aria-label="Hour">
              <SelectValue placeholder="Hora" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="01">01</SelectItem>
              <SelectItem value="02">02</SelectItem>
              <SelectItem value="03">03</SelectItem>
              <SelectItem value="04">04</SelectItem>
              <SelectItem value="05">05</SelectItem>
              <SelectItem value="06">06</SelectItem>
              <SelectItem value="07">07</SelectItem>
              <SelectItem value="08">08</SelectItem>
              <SelectItem value="09">09</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="11">11</SelectItem>
              <SelectItem value="12">12</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger aria-label="Minute">
              <SelectValue placeholder="Minutos" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="00">00</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="45">45</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger aria-label="AM/PM">
              <SelectValue placeholder="AM/PM" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
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
