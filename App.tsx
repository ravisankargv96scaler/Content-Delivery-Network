import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import { TabId, TabConfig } from './types';
import { GlobeIcon, NetworkIcon, DatabaseIcon, ZapIcon, ShieldIcon, FileIcon } from './components/Icons';

// Tabs
import ProblemTab from './components/tabs/ProblemTab';
import SolutionTab from './components/tabs/SolutionTab';
import MechanicsTab from './components/tabs/MechanicsTab';
import BenefitsTab from './components/tabs/BenefitsTab';
import TypesTab from './components/tabs/TypesTab';
import QuizTab from './components/tabs/QuizTab';

const tabs: TabConfig[] = [
  { id: TabId.Problem, label: 'The Problem: Latency', icon: <GlobeIcon className="w-5 h-5" /> },
  { id: TabId.Solution, label: 'The Solution: Edge', icon: <NetworkIcon className="w-5 h-5" /> },
  { id: TabId.Mechanics, label: 'How It Works', icon: <DatabaseIcon className="w-5 h-5" /> },
  { id: TabId.Benefits, label: 'Benefits: Load', icon: <ShieldIcon className="w-5 h-5" /> },
  { id: TabId.Types, label: 'Content Types', icon: <FileIcon className="w-5 h-5" /> },
  { id: TabId.Quiz, label: 'Quiz', icon: <ZapIcon className="w-5 h-5" /> },
];

const App = () => {
  const [activeTab, setActiveTab] = useState<TabId>(TabId.Problem);

  const renderContent = () => {
    switch (activeTab) {
      case TabId.Problem:
        return <ProblemTab />;
      case TabId.Solution:
        return <SolutionTab />;
      case TabId.Mechanics:
        return <MechanicsTab />;
      case TabId.Benefits:
        return <BenefitsTab />;
      case TabId.Types:
        return <TypesTab />;
      case TabId.Quiz:
        return <QuizTab />;
      default:
        return <ProblemTab />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs}>
      {renderContent()}
    </Layout>
  );
};

export default App;