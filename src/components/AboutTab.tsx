import React from 'react';
import { Github, Globe } from 'lucide-react';

export function AboutTab() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Gabriel Rondon</h1>
          <p className="text-lg text-gray-600">
            Enthusiastic about zero knowledge proofs and pushing the boundaries of privacy-preserving technology.
          </p>
        </div>
        
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/gabrielrondon"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://blog.gabrielrondon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Globe className="w-5 h-5" />
            <span>Blog</span>
          </a>
        </div>
      </div>
    </div>
  );
}