import React, { useState } from 'react';
import { ActionPlan } from './components/ActionPlan';
import { HealthcareGuide } from './components/HealthcareGuide';
import { QPIPCalculator } from './components/QPIPCalculator';
import { Timeline } from './components/Timeline';
import { Resources } from './components/Resources';
import { KeyContacts } from './components/KeyContacts';
import { Wellness } from './components/Wellness';
import { ErrorBoundary } from './components/ErrorBoundary';

type TabId = 'action-plan' | 'healthcare' | 'qpip-calculator' | 'timeline' | 'resources' | 'contacts' | 'wellness';

const tabs = [
  { id: 'action-plan' as TabId, label: 'Action Plan' },
  { id: 'healthcare' as TabId, label: 'Healthcare Guide' },
  { id: 'qpip-calculator' as TabId, label: 'QPIP Calculator' },
  { id: 'timeline' as TabId, label: 'Timeline' },
  { id: 'resources' as TabId, label: 'Resources' },
  { id: 'contacts' as TabId, label: 'Key Contacts' },
  { id: 'wellness' as TabId, label: 'Wellness' },
];

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('action-plan');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'action-plan':
        return <ActionPlan />;
      case 'healthcare':
        return <HealthcareGuide />;
      case 'qpip-calculator':
        return <QPIPCalculator />;
      case 'timeline':
        return <Timeline />;
      case 'resources':
        return <Resources />;
      case 'contacts':
        return <KeyContacts />;
      case 'wellness':
        return <Wellness />;
      default:
        return <ActionPlan />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#AF6B51] tracking-tight">
            We are Pregnant
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Congratulations! Here is a calm, supportive guide to help you navigate the exciting journey ahead, right here in Montreal.
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex flex-wrap justify-center space-x-4 sm:space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-btn py-4 px-1 text-base font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-all duration-300 ${
                    activeTab === tab.id ? 'active' : ''
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-controls={tab.id}
                  aria-selected={activeTab === tab.id}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div role="tabpanel">
            {renderTabContent()}
          </div>
        </div>

        <footer className="text-center mt-10 text-gray-500 text-sm">
          <p>This guide provides general information and is not a substitute for professional medical advice. Always consult your healthcare provider.</p>
          <p>&copy; 2025 We are Pregnant. All Rights Reserved.</p>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
