import React, { useState } from 'react';
import { Shield, HelpCircle } from 'lucide-react';
import { Proof } from '../types';
import { Tooltip } from '../components/Tooltip';
import { useLanguage } from '../hooks/useLanguage';

interface VerifierSectionProps {
  proof: Proof | null;
  onVerify: (query: string) => void;
}

export function VerifierSection({ proof, onVerify }: VerifierSectionProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasVerified, setHasVerified] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) {
      setError('Please select a question to verify');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await onVerify(query);
      setHasVerified(true);
    } catch (err) {
      setError('Failed to verify proof. Please try again.');
      console.error('Error verifying proof:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset hasVerified when a new proof is generated
  React.useEffect(() => {
    if (proof?.isValid === null) {
      setHasVerified(false);
    }
  }, [proof]);

  return (
    <div className="p-4 sm:p-8 bg-gray-50 h-full">
      <div className="mb-8 flex items-center space-x-3">
        <Shield className="w-6 h-6 text-green-600 flex-shrink-0" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{t.verifier.title}</h2>
        <Tooltip content="The Verifier can check specific properties without seeing the actual object.">
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
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              {t.verifier.askQuestion}
              <Tooltip content="You can verify specific properties without learning anything else about the object">
                <HelpCircle className="w-4 h-4 ml-2 text-gray-400 cursor-help flex-shrink-0" />
              </Tooltip>
            </label>
            <select
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setError(null);
              }}
              className="w-full p-2 border rounded-md bg-white text-base appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              disabled={isLoading || !proof}
              style={{ WebkitAppearance: 'menulist' }}
            >
              <option value="">{t.verifier.selectQuestion}</option>
              {Object.entries(t.verifier.questions).map(([key, question]) => (
                <option key={key} value={key}>
                  {question}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading || !proof}
            className={`w-full ${
              isLoading || !proof
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            } text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center`}
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⚡</span>
                {t.verifier.verifying}
              </>
            ) : (
              t.verifier.verify
            )}
          </button>
        </form>

        {proof && (
          <div className="mt-6 p-4 rounded-md border">
            <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
              {t.verifier.status.title}
              <Tooltip content="The verification process uses cryptography to check if the proof matches the query, without revealing any additional information">
                <HelpCircle className="w-4 h-4 ml-2 text-gray-400 cursor-help flex-shrink-0" />
              </Tooltip>
            </h3>
            {!hasVerified ? (
              <div className="text-blue-600 font-medium flex items-center">
                <span className="mr-2">🔄</span>
                {t.verifier.status.newProof}
              </div>
            ) : (
              <div className={`text-${proof.isValid ? 'green' : 'red'}-600 font-medium flex items-center`}>
                {proof.isValid ? (
                  <>
                    <span className="mr-2">✓</span>
                    {t.verifier.status.verified}
                  </>
                ) : (
                  <>
                    <span className="mr-2">✗</span>
                    {t.verifier.status.invalid}
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}