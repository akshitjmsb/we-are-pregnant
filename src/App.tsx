import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionPlan } from './components/ActionPlan';
import { HealthcareGuide } from './components/HealthcareGuide';
import { QPIPCalculator } from './components/QPIPCalculator';
import { Timeline } from './components/Timeline';
import { Resources } from './components/Resources';
import { KeyContacts } from './components/KeyContacts';
import { Wellness } from './components/Wellness';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';

type TabId = 'action-plan' | 'healthcare' | 'qpip-calculator' | 'timeline' | 'resources' | 'contacts' | 'wellness';

const tabs = [
  { id: 'action-plan' as TabId, labelKey: 'tabs.actionPlan' },
  { id: 'healthcare' as TabId, labelKey: 'tabs.healthcare' },
  { id: 'qpip-calculator' as TabId, labelKey: 'tabs.qpipCalculator' },
  { id: 'timeline' as TabId, labelKey: 'tabs.timeline' },
  { id: 'resources' as TabId, labelKey: 'tabs.resources' },
  { id: 'contacts' as TabId, labelKey: 'tabs.contacts' },
  { id: 'wellness' as TabId, labelKey: 'tabs.wellness' },
];

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabId>('action-plan');
  const [showLogin, setShowLogin] = useState(false);
  const { t, i18n } = useTranslation();
  const { user, signOut } = useAuth();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

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
        <header className="text-center mb-10 relative">
          <div className="absolute top-0 right-0 flex space-x-2">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 text-sm font-medium text-[#AF6B51] border border-[#AF6B51] rounded hover:bg-[#AF6B51] hover:text-white transition-colors"
            >
              {i18n.language === 'en' ? 'FR' : 'EN'}
            </button>
            {user ? (
              <button
                onClick={() => signOut()}
                className="px-3 py-1 text-sm font-medium text-gray-600 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="px-3 py-1 text-sm font-medium text-white bg-[#AF6B51] rounded hover:bg-[#9c5f48] transition-colors"
              >
                Log In
              </button>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#AF6B51] tracking-tight">
            {t('app.title')}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            {t('app.subtitle')}
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex flex-wrap justify-center space-x-4 sm:space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-btn py-4 px-1 text-base font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-all duration-300 ${activeTab === tab.id ? 'active' : ''
                    }`}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-controls={tab.id}
                  aria-selected={activeTab === tab.id}
                >
                  {t(tab.labelKey)}
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

      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </ErrorBoundary>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
