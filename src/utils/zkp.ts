import * as snarkjs from 'snarkjs';
import { FormData } from '../types';

// Convert form data to circuit inputs
function formDataToInputs(data: FormData) {
  try {
    return {
      color: data.color === 'blue' ? 1 : 0,
      size: data.size === 'small' ? 1 : 0,
      shape: data.shape === 'circle' ? 1 : 0,
      texture: data.texture === 'smooth' ? 1 : 0
    };
  } catch (error) {
    console.error('Error converting form data to inputs:', error);
    throw new Error('Failed to process form data');
  }
}

// For demo purposes, we'll simulate the proof generation
export async function generateProof(formData: FormData) {
  try {
    const inputs = formDataToInputs(formData);
    
    // Simulate proof generation
    const proof = {
      pi_a: ["1", "2", "3"],
      pi_b: [["4", "5"], ["6", "7"], ["8", "9"]],
      pi_c: ["10", "11", "12"],
      protocol: "groth16"
    };
    
    // Store all properties in public signals for verification
    const publicSignals = [
      formData.color === 'blue' ? 1 : 0,
      formData.size === 'small' ? 1 : 0,
      formData.shape === 'circle' ? 1 : 0,
      formData.texture === 'smooth' ? 1 : 0
    ];
    
    return { proof, publicSignals };
  } catch (error) {
    console.error('Error generating proof:', error);
    throw new Error('Failed to generate proof');
  }
}

// For demo purposes, we'll simulate the verification
export async function verifyProof(_proof: any, publicSignals: any, query: string) {
  try {
    if (!_proof || !publicSignals) {
      throw new Error('Missing proof or public signals');
    }

    // Map queries to their corresponding public signal indices
    const propertyMap: Record<string, number> = {
      'isBlue': 0,
      'isSmall': 1,
      'isCircle': 2,
      'isSmooth': 3
    };

    const propertyIndex = propertyMap[query];
    if (propertyIndex === undefined) {
      throw new Error('Invalid query');
    }

    return publicSignals[propertyIndex] === 1;
  } catch (error) {
    console.error('Error verifying proof:', error);
    throw new Error('Failed to verify proof');
  }
}