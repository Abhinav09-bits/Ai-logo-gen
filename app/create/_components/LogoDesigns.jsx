"use client";

import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import LogoDesign from "@/app/_data/LogoDesign";
import Image from "next/image";

function LogoDesigns({ onHandleInputChange,formData}) {
  const [selectedOption, setSelectedOption] = useState(formData?.design);

  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoDesignTitle}
        description={Lookup.LogoDesignDesc}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-6">
        {LogoDesign.map((design, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedOption(design.title);
              onHandleInputChange?.(design);
            }}
            className={`
              cursor-pointer rounded-xl border-2 p-2 transition-all
              hover:border-black
              ${
                selectedOption === design.title
                  ? "border-black"
                  : "border-gray-300"
              }
            `}
          >
            <Image
              src={design.image}
              alt={design.title}
              width={300}
              height={300}
              className="w-full h-[150px] object-cover rounded-lg"
            />

            <p className="text-center text-sm font-medium mt-2">
              {design.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoDesigns;
