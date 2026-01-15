"use client"
import React, { useState } from 'react'
import Lookup from '../_data/Lookup'
import { Button } from '@/components/ui/button'
import Link from 'next/link';

function Hero() {
    const [logoTitle,setLogoTitle]=useState();
    return (
        <div className="flex flex-col items-center justify-center text-center min-h-[60vh] px-4 space-y-6">
            <h2 className="text-black text-5xl font-bold">{Lookup.HeroHeading}</h2>
            <h2 className="text-black text-3xl font-semibold">{Lookup.HeroSubheading}</h2>
            <p className="text-lg text-gray-500 max-w-xl">{Lookup.HeroDescs}</p>

            <div className="flex gap-4 w-full max-w-2xl">
                <input
                    placeholder={Lookup.InputTitlePlaceholder}
                    className="p-3 border rounded-md w-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
                    onChange={(event)=>setLogoTitle(event?.target.value)}
                />
                <Link href={'/create?title='+logoTitle}>
                <Button className="h-[48px] px-6 bg-black text-white hover:bg-gray-800">Get Started</Button>
                </Link>
                
            </div>
        </div>
    )
}

export default Hero
