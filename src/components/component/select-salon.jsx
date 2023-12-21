import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectSalon({ salones, setASelectIsOpen }) {
  const [selectedSalon, setSelectedSalon] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const ref = useRef(null);


    const handleSelectTriggerClick = ()=>{
     
    }

  const handleSalonSelect = (salon) => {
    console.log(salon)
    setSelectedSalon(salon);
  };

  return (
    <div>
      <label>Email</label>
      <Select onOpenChange={(open) => handleSelectTriggerClick(open)}
        
      >
        <SelectTrigger >
          <SelectValue placeholder="Select a salon" />
        </SelectTrigger>
        {isDropdownVisible && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1000, // Adjust the z-index as needed
            }}
          ></div>
        )}
        <SelectContent
            ref={(ref) => ref?.addEventListener('touchend', (e) => e.preventDefault())}
        >
          {salones.map((salon) => (
            <SelectItem
              key={salon.foto_salon}
              value={salon.nombre}
              onSelect={(e) => {
                e.stopPropagation();
                handleSalonSelect(salon.nombre);
              }}
            >
              {salon.nombre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div>
        You can manage email addresses in your{" "}
        <Link href="/examples/forms">email settings</Link>.
      </div>
      <Button type="button" onClick={() => console.log("Selected Salon:", selectedSalon)}>
        Submit
      </Button>
    </div>
  );
}
// <SelectContent className="bg-white">
