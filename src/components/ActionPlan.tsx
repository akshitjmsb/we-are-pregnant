import React from 'react';
import { useCloudChecklistState } from '../hooks/useCloudStorage';
import { ChecklistTask } from '../types';

const checklistData: { trimester: string; tasks: ChecklistTask[] }[] = [
  {
    trimester: "First Trimester (Weeks 1-12)",
    tasks: [
      { id: "t1-1", text: "Confirm pregnancy with a home test or at a clinic.", completed: false },
      { id: "t1-2", text: "Start prenatal vitamins with at least 0.4mg of folic acid.", completed: false },
      { id: "t1-3", text: "Find a healthcare provider: Register on GAMF for a family doctor or contact a midwife/birthing centre.", completed: false },
      { id: "t1-4", text: "Schedule first prenatal appointment (usually between weeks 8-12).", completed: false },
      { id: "t1-5", text: "Review lifestyle: Stop smoking, consuming alcohol & recreational drugs. Limit caffeine.", completed: false },
      { id: "t1-6", text: "Research the Quebec Parental Insurance Plan (QPIP) to understand benefits.", completed: false },
      { id: "t1-7", text: "Check your private health insurance for extra coverage (private room, etc.).", completed: false },
    ]
  },
  {
    trimester: "Second Trimester (Weeks 13-28)",
    tasks: [
      { id: "t2-1", text: "Attend anatomy scan ultrasound (around 20 weeks).", completed: false },
      { id: "t2-2", text: "Register for prenatal classes (childbirth, infant CPR, breastfeeding).", completed: false },
      { id: "t2-3", text: "Take glucose screening test for gestational diabetes (usually weeks 24-28).", completed: false },
      { id: "t2-4", text: "Pre-register at your hospital or birthing centre.", completed: false },
      { id: "t2-5", text: "Plan your maternity leave with your employer.", completed: false },
      { id: "t2-6", text: "Start planning the nursery and purchasing baby essentials.", completed: false },
    ]
  },
  {
    trimester: "Third Trimester (Weeks 29-40+)",
    tasks: [
      { id: "t3-1", text: "Pack your hospital bag.", completed: false },
      { id: "t3-2", text: "Install the baby car seat in your vehicle.", completed: false },
      { id: "t3-3", text: "Finalize and submit your QPIP application.", completed: false },
      { id: "t3-4", text: "Discuss your birth plan with your healthcare provider.", completed: false },
      { id: "t3-5", text: "Prepare/freeze meals for the postpartum period.", completed: false },
      { id: "t3-6", text: "Wash baby's clothes, blankets, and sheets.", completed: false },
      { id: "t3-7", text: "Rest as much as possible!", completed: false },
    ]
  }
];

export function ActionPlan() {
  const { completedTasks, toggleTask, isTaskCompleted, isLoading, error } = useCloudChecklistState();

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#AF6B51]"></div>
        <p className="mt-4 text-gray-600">Loading your checklist...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-red-600">Unable to load your checklist. Please try refreshing the page.</p>
          <p className="text-sm text-red-500 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Your Pregnancy Action Plan</h2>
        <p className="mt-2 text-gray-600">An interactive checklist to keep you on track. Click to mark tasks as complete.</p>
        <p className="mt-1 text-sm text-gray-500">Your progress is saved in the cloud and synced across all devices.</p>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-8">
        {checklistData.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className="font-bold text-xl text-[#AF6B51] mb-4 pb-2 border-b-2 border-[#F0E5DE]">
              {section.trimester}
            </h3>
            <ul className="space-y-3">
              {section.tasks.map((task) => (
                <li
                  key={task.id}
                  className={`checklist-item ${isTaskCompleted(task.id) ? 'completed' : ''}`}
                  onClick={() => toggleTask(task.id)}
                  tabIndex={0}
                  role="checkbox"
                  aria-checked={isTaskCompleted(task.id)}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      toggleTask(task.id);
                    }
                  }}
                >
                  <span className="checklist-checkbox"></span>
                  <span className="checklist-text">
                    {task.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
