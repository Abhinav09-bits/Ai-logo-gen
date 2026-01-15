import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import Colors from "@/app/_data/Colors";

function LogoPlette({ onHandleInputChange,formData }) {
  const [selectedOption, setSelectedOption] = useState(formData?.palette);

  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoColorPalleteTitle}
        description={Lookup.LogoColorPalleteDesc}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {Colors.map((palette, index) => (
          <div
            key={index}
            className={`flex p-1 cursor-pointer border-2 rounded-lg hover:border-black ${
              selectedOption === palette.name ? "border-black" : "border-gray-300"
            }`}
            onClick={() => {
              setSelectedOption(palette.name);
              onHandleInputChange(palette.name);
            }}
          >
            {palette.colors.map((color, idx) => (
              <div
                key={idx}
                className="h-24 w-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoPlette;
