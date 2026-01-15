"use client"
import React, { useEffect, useContext } from 'react'
import Image from 'next/image'
import HeadingDescription from "./HeadingDescription"
import Lookup from "@/app/_data/Lookup"
import { SignInButton, useUser } from '@clerk/nextjs'
import { UserDetailContext } from '../../_context/UserDetailContext'
import axios from 'axios'

function PricingModel({formData, onHandleInputChange}) {
  const { user } = useUser();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const handleGenerate = async (pricing) => {
    if (pricing.type === 'premium') {
      if (!userDetail || userDetail.credits <= 0) {
        alert('Insufficient credits. Please sign up or buy more credits.');
        return;
      }
      try {
        const response = await axios.post('/api/update-credits', {
          userEmail: user?.primaryEmailAddress?.emailAddress
        });
        if (response.data.success) {
          setUserDetail(prev => ({ ...prev, credits: response.data.credits }));
          window.location.href = '/generate-logo?type=' + pricing.type;
        } else {
          alert(response.data.error);
        }
      } catch (error) {
        console.error('Error updating credits:', error);
        alert('Failed to update credits. Please try again.');
      }
    } else {
      window.location.href = '/generate-logo?type=' + pricing.type;
    }
  }  
  useEffect(()=>{
    if(formData?.title && typeof window !== 'undefined'){
      localStorage.setItem('logoFormData', JSON.stringify(formData));
    }
  },[formData])
  return (
    <div className='my-10'>
        <HeadingDescription
        title={Lookup.LogoPricingModelTitle}
        description={Lookup.LogoPricingModelDesc}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-10'>
          {Lookup.pricingOption.map((pricing,index)=>(
            <div key={index} className='flex flex-col p-8 border rounded-lg hover:shadow-lg transition-shadow bg-white'>
              <div className='flex items-center gap-3 mb-4'>
                <Image src={pricing.icon} alt={pricing.title} width={50} height={50}/>
                <h3 className='font-bold text-xl'>{pricing.title}</h3>
              </div>
              
              <div className='flex-1 mb-6'>
                <ul className='space-y-3'>
                  {pricing.features?.map((feature, idx)=>(
                    <li key={idx} className='text-gray-700 text-sm'>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              {
                user? <button onClick={() => handleGenerate(pricing)} className='w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all font-medium'>
                {pricing.button}
              </button>
              :<SignInButton mode='modal' redirectUrl={'/generate-logo?type=' + pricing.type}>
                <button className='w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all font-medium'>
                  {pricing.button}
                </button>
              </SignInButton>
              }
             
            </div>
          ))}
        </div>
    </div>
  )
}

export default PricingModel  