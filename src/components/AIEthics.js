import React, { useState } from 'react';
import { analyzeBias } from '../utils/openRouterAPI';

const AIEthics = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const checkForBias = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text to analyze.');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const analysis = await analyzeBias(inputText);
      setResult({
        isFair: analysis.isFair,
        confidence: analysis.confidence,
        details: analysis.reason,
        suggestions: analysis.suggestions || []
      });
    } catch (error) {
      console.error('Bias analysis error:', error);
      setResult({
        isFair: true,
        confidence: 'Low',
        details: 'Unable to analyze due to an error. Please try again.',
        suggestions: ['Please check your internet connection and try again.']
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setInputText('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🤖 AI Ethics - Governing AI</h1>
          <p className="text-lg text-gray-600">
            Analyze text for potential bias and fairness in AI systems
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="bias-text" className="block text-sm font-medium text-gray-700 mb-2">
              Enter text to analyze for bias:
            </label>
            <textarea
              id="bias-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your text here to check for potential bias..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={checkForBias}
              disabled={isAnalyzing || !inputText.trim()}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : (
                'Check for Bias'
              )}
            </button>
            
            {result && (
              <button
                onClick={resetAnalysis}
                className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Analyze New Text
              </button>
            )}
          </div>

          {result && (
            <div className="mt-6">
              <div className={`p-6 rounded-lg border-2 ${
                result.isFair 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="text-center">
                  <div className={`text-4xl mb-4 ${
                    result.isFair ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {result.isFair ? '✅' : '⚠️'}
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${
                    result.isFair ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.isFair ? 'Fair' : 'Unfair'}
                  </h3>
                  <p className={`text-lg ${
                    result.isFair ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {result.details}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Confidence: {result.confidence}
                  </p>
                  
                  {result.suggestions && result.suggestions.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">AI Suggestions:</h4>
                      <ul className="space-y-1">
                        {result.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Important Note
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    <strong>AI needs to be transparent and ethical.</strong> This tool provides a basic analysis 
                    for educational purposes. Real-world bias detection requires more sophisticated algorithms 
                    and human oversight to ensure fairness and inclusivity in AI systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIEthics;
