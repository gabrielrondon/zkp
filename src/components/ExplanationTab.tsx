import React from 'react';
import { BookOpen, Lock, Shield, Fingerprint, CheckCircle } from 'lucide-react';

export function ExplanationTab() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">How Zero-Knowledge Proofs Work</h1>
      
      <div className="space-y-12">
        <section className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Lock className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">The Basics</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Zero-Knowledge Proofs (ZKPs) allow one party (the Prover) to prove to another party (the Verifier) 
            that a statement is true without revealing any information beyond the validity of the statement itself.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-blue-700">
              In our demo, the Prover knows all properties of an object (color, size, shape, texture) but only wants
              to prove specific properties without revealing the others.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Fingerprint className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-800">The Process</h2>
          </div>
          <ol className="space-y-6">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold mr-3">1</span>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Prover's Input</h3>
                <p className="text-gray-600">The Prover selects the object's properties through the interface. These properties are converted into mathematical inputs for the circuit.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold mr-3">2</span>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Proof Generation</h3>
                <p className="text-gray-600">The system generates a cryptographic proof using the circuit. This proof encodes the properties in a way that allows verification without revealing the actual values.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold mr-3">3</span>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Verification</h3>
                <p className="text-gray-600">The Verifier can ask specific questions about the object's properties. The system checks the proof against these questions without accessing the original data.</p>
              </div>
            </li>
          </ol>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-800">Security Properties</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Completeness</h3>
              <p className="text-green-700">If the statement is true, an honest Prover can convince the Verifier.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Soundness</h3>
              <p className="text-green-700">If the statement is false, no cheating Prover can convince the Verifier.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Zero-Knowledge</h3>
              <p className="text-green-700">The Verifier learns nothing except the truth of the statement.</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-800">Real-World Applications</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border border-indigo-100 rounded-lg">
              <h3 className="font-semibold text-indigo-900 mb-2">Privacy-Preserving Identity</h3>
              <p className="text-gray-600">Prove you're over 18 without revealing your actual age.</p>
            </div>
            <div className="p-4 border border-indigo-100 rounded-lg">
              <h3 className="font-semibold text-indigo-900 mb-2">Blockchain Privacy</h3>
              <p className="text-gray-600">Verify transactions without exposing amounts or addresses.</p>
            </div>
            <div className="p-4 border border-indigo-100 rounded-lg">
              <h3 className="font-semibold text-indigo-900 mb-2">Credential Verification</h3>
              <p className="text-gray-600">Prove educational credentials without revealing transcript details.</p>
            </div>
            <div className="p-4 border border-indigo-100 rounded-lg">
              <h3 className="font-semibold text-indigo-900 mb-2">Supply Chain Verification</h3>
              <p className="text-gray-600">Verify product authenticity without exposing sensitive data.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}