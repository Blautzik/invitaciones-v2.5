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

export function SelectSalon({ salones }) {
  const [selectedSalon, setSelectedSalon] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Attach click event listener to document to handle clicks outside the dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      // Remove event listener on component unmount
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSelectTriggerClick = () => {
    // Toggle dropdown visibility on SelectTrigger click
    setIsDropdownVisible((prev) => !prev);
  };

  const handleSalonSelect = (salon) => {
    setSelectedSalon(salon);
    // Close dropdown after a brief delay
    setTimeout(() => {
      setIsDropdownVisible(false);
    }, 100);
  };

  return (
    <div>
      <label>Email</label>
      <Select>
        <SelectTrigger onClick={handleSelectTriggerClick}>
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
        <SelectContent visible={isDropdownVisible.toString()} ref={dropdownRef}>
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
