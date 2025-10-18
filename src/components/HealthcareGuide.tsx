import React, { useState } from 'react';

const steps = [
  {
    id: '1',
    title: 'Find a Provider',
    content: {
      title: 'Step 1: Find a Doctor (Obstetrician/GP) or a Midwife (Sage-Femme)',
      description: 'You have two main options for your care provider, both covered by RAMQ. Start looking immediately.',
      options: [
        {
          title: 'Doctor (OB/GYN or Family Doctor)',
          items: [
            'Use the Quebec Family Doctor Finder (GAMF). Register online and indicate you are pregnant.',
            'Call hospitals directly and ask if any obstetricians are accepting new patients.',
            'Ask friends or colleagues for recommendations and call their clinics.'
          ]
        },
        {
          title: 'Midwife (Sage-Femme)',
          items: [
            'Contact a Maison de Naissance (birthing centre) in your area.',
            'Places are limited and fill up very fast. Call as soon as you have a positive test.',
            'Midwives offer care throughout pregnancy, labour, and postpartum.'
          ]
        }
      ]
    }
  },
  {
    id: '2',
    title: 'Initial Tests',
    content: {
      title: 'Step 2: Get Your First Medical Tests',
      description: 'Once you find a provider, they will give you requisitions for your first set of tests.',
      items: [
        'Blood & Urine Tests: You\'ll get a requisition to take to a CLSC or private lab. These tests confirm the pregnancy, check your blood type, iron levels, and screen for infections.',
        'Dating Ultrasound: This is your first ultrasound, typically between 7-11 weeks. It confirms the due date and checks for the fetal heartbeat. Your doctor or midwife will refer you.'
      ]
    }
  },
  {
    id: '3',
    title: 'Ongoing Care',
    content: {
      title: 'Step 3: Establish Your Ongoing Care Plan',
      description: 'After your initial tests, you\'ll fall into a regular appointment schedule.',
      items: [
        'Regular Check-ups: Usually monthly until week 28, then bi-weekly, then weekly in the final month.',
        'Prenatal Screening: You will be offered screening for chromosomal abnormalities (e.g., Trisomy 21). This is optional and will be discussed with you.',
        'Hospital Registration: If you are with a doctor, you will need to register at the hospital where they deliver, usually in your second trimester.'
      ]
    }
  }
];

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
                <div className={`stepper-circle w-12 h-12 rounded-full flex items-center justify-center mx-auto font-bold text-lg ${
                  activeStep === step.id ? 'bg-[#D5A08C] text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.id}
                </div>
                {index < steps.length - 1 && <div className="stepper-line"></div>}
              </div>
              <div className="stepper-content-wrapper">
                <p className={`stepper-title mt-2 font-medium ${
                  activeStep === step.id ? 'text-[#AF6B51] font-semibold' : 'text-gray-600'
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
