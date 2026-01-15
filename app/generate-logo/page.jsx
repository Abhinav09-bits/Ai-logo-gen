"use client"
import React, { useEffect, useContext, useState } from 'react'
import { UserDetailContext } from '../_context/UserDetailContext'
import Prompt from '../_data/Prompt'


function GenerateLogo() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined' && userDetail?.email) {
      const storage = localStorage.getItem('formData');
      if (storage) {
        const parsedData = JSON.parse(storage);
        setFormData(parsedData);
      }
    }
  }, [userDetail])

  const [imageUrl, setImageUrl] = useState('');

  const [loading, setLoading] = useState(false);

  const GenerateAILogo = async () => {
    setLoading(true);
    const PROMPT = Prompt.DESIGN_IDEA_PROMPT
      .replace('{LogoType}', formData?.design?.title || '')
      .replace('{LogoTitle}', formData?.title || '')
      .replace('{LogoDesc}', formData?.desc || '')
      .replace('{LogoColor}', formData?.palette || '')
      .replace('{LogoDesign}', formData?.design?.title || '')
      .replace('{LogoIdea}', formData?.idea || '');

    try {
      const response = await fetch('/api/generate-logo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: PROMPT }),
      });
      const data = await response.json();
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error generating logo:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-28 p-10 border rounded-xl max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Generated Logo</h1>
      {imageUrl ? (
        <div className="text-center">
          <img src={imageUrl} alt="Generated Logo" className="mx-auto mb-6 border rounded-lg shadow-lg" />
          <div className="flex gap-4 justify-center">
            <a href={imageUrl} download="generated-logo.png" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Download Logo
            </a>
            <button onClick={() => window.location.href = '/dashboard'} className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700">
              Go to Dashboard
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <button onClick={GenerateAILogo} disabled={loading} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50">
            {loading ? 'Generating...' : 'Generate Logo'}
          </button>
        </div>
      )}
    </div>
  )
}

export default GenerateLogo
