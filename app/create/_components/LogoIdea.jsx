import React, { useEffect, useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import axios from 'axios'
import Prompt from '@/app/_data/Prompt'
import { Loader2Icon } from 'lucide-react'

function LogoIdea({formData,onHandleInputChange}) {

  const [ideas,setIdeas]=useState();
  const [loading,setLoading]=useState(false);
  const [selectedOption,setSelectedOption]=useState(formData?.idea);
  useEffect(()=>{
    if(formData?.title && formData?.desc && formData?.design){
      generateLogoDesignIdea();
    }
  },[formData?.title, formData?.desc, formData?.design])

  const generateLogoDesignIdea=async()=>{
   
    setLoading(true)
    try {
      const PROMPT=Prompt.logoIdeaPrompt
      .replace('{LogoType}',formData?.design?.title || '')
      .replace('{LogoTitle}',formData?.title || '')
      .replace('{LogoDesc}',formData?.desc || '')
      .replace('{LogoDesign}',formData?.design?.title || '')
      .replace('{LogoColor}',formData?.palette || '')
      .replace('{LogoIdea}','')

      const result=await axios.post('/api/ai-design-ideas',{
        prompt:PROMPT
      })

      console.log(result.data)
      setIdeas(result.data.ideas);
    } catch (error) {
      console.error('Error generating ideas:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='my-10'>
      <HeadingDescription
      title={Lookup.LogoIdeaTitle}
      description={Lookup.LogoIdeaDesc}
      />
    <div className='flex items-center justify-center'>
    {loading&&<Loader2Icon className='animate-spin my-10' />}
    </div>
    <div className='flex flex-wrap gap-3 mt-6'>
      {ideas&&ideas.map((item,index)=>(
        <h2 key={index}
        onClick={()=>{setSelectedOption(item);
          onHandleInputChange(item)
        }}
        className={`p-2 rounded-full border px-3 cursor-pointer
          hover:border-primary ${selectedOption==item&&'border-primary'}`}
        >{item}</h2>
      ))}
      <h2 
       onClick={()=>{setSelectedOption('Let AI Select the best idea');
        onHandleInputChange('Let AI Select the best idea')
      }}
      className={`p-2 rounded-full border px-3 cursor-pointer
          hover:border-primary ${selectedOption=='Let AI Select the best idea'&&'border-primary'}`}>Let AI Select the best idea</h2>
    </div>
    </div>
    
  )
}

export default LogoIdea