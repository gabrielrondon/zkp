import React, { useState } from 'react';
import { FormData } from '../types';
import { Lock, HelpCircle } from 'lucide-react';
import { Tooltip } from '../components/Tooltip';
import { useLanguage } from '../hooks/useLanguage';

interface ProverSectionProps {
  onGenerateProof: (data: FormData) => void;
}

export function ProverSection({ onGenerateProof }: ProverSectionProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    color: 'blue',
    size: 'small',
    shape: 'circle',
    texture: 'smooth'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await onGenerateProof(formData);
    } catch (err) {
      setError('Failed to generate proof. Please try again.');
      console.error('Error generating proof:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getOptionsForProperty = (property: keyof FormData) => {
    switch (property) {
      case 'color':
        return [
          { value: 'blue', label: t.prover.values.blue },
          { value: 'red', label: t.prover.values.red }
        ];
      case 'size':
        return [
          { value: 'small', label: t.prover.values.small },
          { value: 'large', label: t.prover.values.large }
        ];
      case 'shape':
        return [
          { value: 'circle', label: t.prover.values.circle },
          { value: 'square', label: t.prover.values.square }
        ];
      case 'texture':
        return [
          { value: 'smooth', label: t.prover.values.smooth },
          { value: 'rough', label: t.prover.values.rough }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8 flex items-center space-x-3">
        <Lock className="w-6 h-6 text-blue-600 flex-shrink-0" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{t.prover.title}</h2>
        <Tooltip content="The Prover creates a cryptographic proof that they know specific information without revealing the actual data.">
          <HelpCircle className="w-5 h-5 text-gray-400 cursor-help flex-shrink-0" />
        </Tooltip>
      </div>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {(Object.keys(t.prover.properties) as Array<keyof FormData>).map((property) => (
            <div key={property} className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                {t.prover.properties[property]}
                <Tooltip content="This property can be proven without revealing other details">
                  <HelpCircle className="w-4 h-4 ml-2 text-gray-400 cursor-help flex-shrink-0" />
                </Tooltip>
              </label>
              <select
                name={property}
                value={formData[property]}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              >
                {getOptionsForProperty(property).map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${
              isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center`}
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⚡</span>
                {t.prover.generatingProof}
              </>
            ) : (
              t.prover.generateProof
            )}
          </button>
        </form>
      </div>
    </div>
  );
}