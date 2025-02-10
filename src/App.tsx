import React, { useState } from 'react';
import { ProverSection } from './components/ProverSection';
import { VerifierSection } from './components/VerifierSection';
import { ExplanationTab } from './components/ExplanationTab';
import { CasesTab } from './components/CasesTab';
import { AboutTab } from './components/AboutTab';
import { LanguageSelector } from './components/LanguageSelector';
import { FormData, Proof } from './types';
import { generateProof, verifyProof } from './utils/zkp';
import { BookOpen, Play, Code, User } from 'lucide-react';
import { useLanguage } from './hooks/useLanguage';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'demo' | 'explanation' | 'cases' | 'about'>('demo');
  const [proof, setProof] = useState<Proof | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const { t } = useLanguage();

  const handleGenerateProof = async (data: FormData) => {
    try {
      setFormData(data);
      const { proof, publicSignals } = await generateProof(data);
      setProof({ proof, publicSignals, isValid: null });
    } catch (error) {
      console.error('Error generating proof:', error);
      throw error;
    }
  };

  const handleVerify = async (query: string) => {
    if (!proof?.proof || !proof?.publicSignals) return;

    try {
      const isValid = await verifyProof(proof.proof, proof.publicSignals, query);
      setProof(prev => ({ ...prev!, isValid }));
    } catch (error) {
      console.error('Error verifying proof:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <h1 className="text-2xl font-bold text-gray-900">
            {t.title}
          </h1>
          <LanguageSelector />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('demo')}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'demo'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Play className="w-5 h-5 mr-2" />
            {t.tabs.demo}
          </button>
          <button
            onClick={() => setActiveTab('explanation')}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'explanation'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            {t.tabs.explanation}
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'cases'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Code className="w-5 h-5 mr-2" />
            {t.tabs.cases}
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'about'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <User className="w-5 h-5 mr-2" />
            {t.tabs.about}
          </button>
        </div>

        {activeTab === 'demo' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProverSection onGenerateProof={handleGenerateProof} />
            <VerifierSection proof={proof} onVerify={handleVerify} />
          </div>
        ) : activeTab === 'explanation' ? (
          <ExplanationTab />
        ) : activeTab === 'cases' ? (
          <CasesTab />
        ) : (
          <AboutTab />
        )}
      </div>
    </div>
  );
};

export default App;