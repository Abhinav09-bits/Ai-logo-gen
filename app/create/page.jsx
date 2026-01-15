"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

import LogoTitle from "./_components/LogoTitle";
import LogoDesc from "./_components/LogoDesc";
import LogoPalette from "./_components/LogoPalette";
import LogoDesigns from "./_components/LogoDesigns";
import LogoIdea from "./_components/LogoIdea";
import PricingModel from "./_components/PricingModel";

function CreateLogo() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    palette: '',
    design: '',
    idea: '',
    pricing: ''
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('logoFormData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData(prev => ({
          ...prev,
          ...parsedData
        }));
      }
    }
  }, []);

  // Save formData to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && Object.keys(formData).length > 0) {
      localStorage.setItem('logoFormData', JSON.stringify(formData));
    }
  }, [formData]);

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="mt-28 p-10 border rounded-xl max-w-5xl mx-auto">
      {step === 1 && (
        <LogoTitle
          formData={formData}
          onHandleInputChange={(v) => onHandleInputChange("title", v)}
        />
      )}

      {step === 2 && (
        <LogoDesc
          formData={formData}
          onHandleInputChange={(v) => onHandleInputChange("desc", v)}
        />
      )}

      {step === 3 && (
        <LogoPalette
          formData={formData}
          onHandleInputChange={(v) => onHandleInputChange("palette", v)}
        />
      )}

      {step === 4 && (
        <LogoDesigns
          formData={formData}
          onHandleInputChange={(v) => onHandleInputChange("design", v)}
        />
      )}

      {step === 5 && (
        <LogoIdea
          formData={formData}
          onHandleInputChange={(v) => onHandleInputChange("idea", v)}
        />
      )}

      {step === 6 && (
        <PricingModel
          formData={formData}
          onHandleInputChange={(v) => onHandleInputChange("pricing", v)}
        />
      )}

      <div className="flex gap-4 mt-6">
        <Button
          disabled={step === 1}
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          className="bg-gray-200 text-black hover:bg-gray-300"
        >
          <ArrowLeft className="mr-2" />
          Previous
        </Button>

        <Button
          disabled={step === 6}
          onClick={() => setStep((s) => Math.min(6, s + 1))}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Continue
          <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}

export default CreateLogo;
