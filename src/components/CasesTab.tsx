import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Shield, Heart, GraduationCap, Truck, Fingerprint, Key, Wallet } from 'lucide-react';

export function CasesTab() {
  const { t } = useLanguage();

  const cases = [
    {
      title: 'Identity Verification',
      icon: Fingerprint,
      description: 'Prove age without revealing birth date',
      circuit: `
pragma circom 2.1.4;

template AgeVerification() {
    signal input birthDate;
    signal input currentDate;
    signal input minimumAge;
    signal output isOldEnough;

    component ageCheck = GreaterEq(64);
    ageCheck.in[0] <== currentDate - birthDate;
    ageCheck.in[1] <== minimumAge * 365; // days in a year
    
    isOldEnough <== ageCheck.out;
}`,
      explanation: 'This circuit allows age verification for legal requirements while keeping the actual birth date private.'
    },
    {
      title: 'Financial Compliance',
      icon: Wallet,
      description: 'Prove sufficient funds without revealing balance',
      circuit: `
pragma circom 2.1.4;

template BalanceCheck() {
    signal input balance;
    signal input threshold;
    signal output hasSufficientFunds;

    component check = GreaterEq(252);
    check.in[0] <== balance;
    check.in[1] <== threshold;
    
    hasSufficientFunds <== check.out;
}`,
      explanation: 'This circuit verifies financial requirements without exposing the actual account balance.'
    },
    {
      title: 'Password Authentication',
      icon: Key,
      description: 'Verify password hash without revealing the password',
      circuit: `
pragma circom 2.1.4;

template PasswordVerify() {
    signal input passwordHash;
    signal input storedHash;
    signal output isValid;

    component hasher = Poseidon(1);
    hasher.inputs[0] <== passwordHash;
    
    component check = IsEqual();
    check.in[0] <== hasher.out;
    check.in[1] <== storedHash;
    
    isValid <== check.out;
}`,
      explanation: 'This circuit enables secure password verification without storing or transmitting the actual password.'
    },
    {
      title: 'Vaccination Status',
      icon: Heart,
      description: 'Prove vaccination status without revealing medical history',
      circuit: `
pragma circom 2.1.4;

template VaccinationProof() {
    signal input vaccineDate;
    signal input currentDate;
    signal input vaccineType;
    signal input requiredType;
    signal output isValidVaccination;

    component dateValid = GreaterEq(64);
    component typeValid = IsEqual();
    
    dateValid.in[0] <== vaccineDate + 180;
    dateValid.in[1] <== currentDate;
    
    typeValid.in[0] <== vaccineType;
    typeValid.in[1] <== requiredType;
    
    isValidVaccination <== dateValid.out * typeValid.out;
}`,
      explanation: 'This circuit verifies vaccination status while protecting medical privacy.'
    },
    {
      title: 'Academic Certificate',
      icon: GraduationCap,
      description: 'Verify academic credentials without exposing grades',
      circuit: `
pragma circom 2.1.4;

template AcademicProof() {
    signal input gpa;
    signal input graduationYear;
    signal input degreeHash;
    signal input institutionCode;
    signal output isValidDegree;

    component gpaCheck = GreaterEq(32);
    component yearCheck = LessEq(32);
    
    gpaCheck.in[0] <== gpa;
    gpaCheck.in[1] <== 2000;
    
    yearCheck.in[0] <== graduationYear;
    yearCheck.in[1] <== 2024;
    
    isValidDegree <== gpaCheck.out * yearCheck.out;
}`,
      explanation: 'This circuit enables verification of academic credentials while maintaining grade privacy.'
    },
    {
      title: 'Cattle Transportation',
      icon: Truck,
      description: 'Verify cattle transport compliance without revealing route details',
      circuit: `
pragma circom 2.1.4;

template CattleTransport() {
    signal input temperature;
    signal input restTime;
    signal input distance;
    signal input capacity;
    signal output isCompliant;

    component tempValid = InRange(32);
    component restValid = GreaterEq(32);
    component distanceValid = LessEq(32);
    
    tempValid.in <== temperature;
    tempValid.lower <== 10;
    tempValid.upper <== 30;
    
    restValid.in[0] <== restTime;
    restValid.in[1] <== 480;
    
    distanceValid.in[0] <== distance;
    distanceValid.in[1] <== 800;
    
    isCompliant <== tempValid.out * restValid.out * distanceValid.out;
}`,
      explanation: 'This circuit verifies cattle transport compliance without exposing sensitive business data.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((case_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <case_.icon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <h3 className="text-xl font-bold text-gray-900">{case_.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{case_.description}</p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Circuit Example:</h4>
                <div className="relative">
                  <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto max-h-48 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                    <code>{case_.circuit}</code>
                  </pre>
                </div>
              </div>
              <p className="text-sm text-gray-500">{case_.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}