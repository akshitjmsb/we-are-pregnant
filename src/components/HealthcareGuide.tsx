import React, { useState } from 'react';

import { healthcareSteps as steps } from '../data/healthcareData';

export function HealthcareGuide() {
  const [activeStep, setActiveStep] = useState('1');

  const activeStepData = steps.find(step => step.id === activeStep);

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Navigating the Quebec Healthcare System</h2>
        <p className="mt-2 text-gray-600 max-w-3xl mx-auto">
          Finding pregnancy care in Montreal involves a few key steps. This guide breaks down the process. It's a bit of work, but very manageable.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Stepper */}
        <div className="flex items-start mb-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`stepper-item ${activeStep === step.id ? 'active' : ''}`}
              onClick={() => setActiveStep(step.id)}
            >
              <div className="stepper-visual">
                <div className={`stepper-circle w-12 h-12 rounded-full flex items-center justify-center mx-auto font-bold text-lg ${activeStep === step.id ? 'bg-[#D5A08C] text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                  {step.id}
                </div>
                {index < steps.length - 1 && <div className="stepper-line"></div>}
              </div>
              <div className="stepper-content-wrapper">
                <p className={`stepper-title mt-2 font-medium ${activeStep === step.id ? 'text-[#AF6B51] font-semibold' : 'text-gray-600'
                  }`}>
                  {step.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stepper Content */}
        <div className="bg-[#FDFBF8] p-6 rounded-lg">
          {activeStepData && (
            <div>
              <h3 className="font-bold text-lg text-[#AF6B51] mb-3">{activeStepData.content.title}</h3>
              <p className="text-gray-700 mb-4">{activeStepData.content.description}</p>

              {activeStepData.content.options ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {activeStepData.content.options.map((option, index) => (
                    <div key={index}>
                      <h4 className="font-semibold">{option.title}</h4>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        {option.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="list-disc list-inside space-y-2">
                  {activeStepData.content.items?.map((item, index) => (
                    <li key={index}>
                      <span className="font-bold">{item.split(':')[0]}:</span> {item.split(':').slice(1).join(':')}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
