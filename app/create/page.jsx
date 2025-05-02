"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import LogoTitle from './_components/LogoTitle'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import LogoDesc from './_components/LogoDesc'
import LogoPlette from './_components/LogoPalette'
import LogoDesigns from './_components/LogoDesigns'
import LogoIdea from './_components/LogoIdea'

function CreateLogo() {
    const[step,setStep]=useState(1);
    const [formData,setFormData]=useState(1);
    const onHandleInputchange=(field,value)=>{

        setFormData(prev=>({
            ...prev,
            [field]:value
        }))

        console.log(formData)
    }
    return (
        <div className='mt-28 p-10 border rounded-xl max-w-5xl mx-auto'>
            {step==1?
               <LogoTitle onHandleInputchange={(v)=>onHandleInputchange('title',v)}
               formData={formData}/>
              : step==2?
              <LogoDesc onHandleInputchange={(v)=>onHandleInputchange('Desc',v)}
              formData={formData}/>:
              step==3?
              <LogoPlette onHandleInputchange={(v)=>onHandleInputchange('palette',v)}
              formData={formData}/>:
              step==4?
              <LogoDesigns onHandleInputchange={(v)=>onHandleInputchange('design',v)}
              formData={formData}/>:
              step==5?
              <LogoIdea onHandleInputchange={(v)=>onHandleInputchange('idea',v)}
              formData={formData}/>:
              null

            }
         
            <div className='flex gap-4 mt-6'>
                <Button onClick={()=>setStep(step-1)}  className='bg-gray-200 text-black hover:bg-gray-300'>
                    <ArrowLeft className="mr-2" />
                    Previous
                </Button>
                <Button onClick={()=>setStep(step+1)} className='bg-blue-600 text-white hover:bg-blue-700'>
                    Continue
                    <ArrowRight className="ml-2" />
                </Button>
            </div>
        </div>
    )
}

export default CreateLogo
