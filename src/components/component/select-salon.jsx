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

export function SelectSalon({ salones, setASelectIsOpen, setSelectedSalon, selectedSalon }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const ref = useRef(null);


    const handleSelectTriggerClick = ()=>{
    }

  const handleSalonSelect = (salon) => {
    console.log("Selected Salon:", salon);
    setSelectedSalon(salon);
  };

  return (
    <div>
      <Select 
        onOpenChange={(open) => handleSelectTriggerClick(open)}
        onValueChange={(value) => handleSalonSelect(value)}
      >
        <SelectTrigger >
          <SelectValue placeholder="Seleccioná tu salón" />
        </SelectTrigger>
        {isDropdownVisible && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1000, 
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
              onSelect={() => {
                handleSalonSelect(salon.nombre);
              }}
            >
              {salon.nombre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
    </div>
  );
}
// <SelectContent className="bg-white">
