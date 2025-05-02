import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import LogoDesig from "@/app/_data/LogoDesign";
import Image from "next/image";

function LogoDesigns(onHandleInputChange){
    const [selectedOption,setSelectedOption]=useState();
    return(
        <div className="my-10">
            <HeadingDescription
            title={Lookup.LogoDesignTitle}
            description={Lookup.LogoDesignDesc}
            />
            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
                {LogoDesig.map((design,index)=>(
                    <div key={index}
                    onClick={()=>{setSelectedOption(design.title);
                        onHandleInputChange(design)
                    }}
                    
                    className={`p-1 hover:border-2 border-primary rouded-xl ${selectedOption==design.title && 'border-2 border-primary'} w-40 h-5   0 rounded-md cursor-pointer`}>
                        <Image src={design.image} alt={design.title} width={300}
                        height={200}
                        className='w-full rounded-xl h-[200px] object-cover'
                        />
                    </div>
               ) )}
            </div>
        </div>
    )
}
export default LogoDesigns