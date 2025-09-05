import React, { useState } from 'react';
import { callOpenRouter } from '../utils/openRouterAPI';

const APITest = () => {
  const [testResult, setTestResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  const testAPI = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      const messages = [
        {
          role: "user",
          content: "What is the meaning of life? Please respond in one sentence."
        }
      ];

      const response = await callOpenRouter(messages);
      
      setTestResult({
        success: true,
        response: response,
        timestamp: new Date().toLocaleTimeString()
      });
    } catch (error) {
      setTestResult({
        success: false,
        error: error.message,
        timestamp: new Date().toLocaleTimeString()
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">🔧 API Connection Test</h1>
        <p className="text-gray-600">
          Test the OpenRouter API connection with GPT-OSS-20B model
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={testAPI}
          disabled={isTesting}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isTesting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Testing API...
            </span>
          ) : (
            'Test API Connection'
          )}
        </button>

        {testResult && (
          <div className={`p-4 rounded-lg border-2 ${
            testResult.success 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center mb-2">
              <div className={`text-2xl mr-2 ${
                testResult.success ? 'text-green-600' : 'text-red-600'
              }`}>
                {testResult.success ? '✅' : '❌'}
              </div>
              <h3 className={`text-lg font-semibold ${
                testResult.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {testResult.success ? 'API Test Successful!' : 'API Test Failed'}
              </h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">
              Tested at: {testResult.timestamp}
            </p>

            {testResult.success ? (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">AI Response:</h4>
                <p className="text-gray-700 bg-white p-3 rounded border">
                  "{testResult.response}"
                </p>
              </div>
            ) : (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Error Details:</h4>
                <p className="text-red-700 bg-white p-3 rounded border">
                  {testResult.error}
                </p>
                {testResult.error.includes('API Key is invalid') && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <h5 className="font-medium text-yellow-800 mb-2">How to fix this:</h5>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Check if your OpenRouter API key is correct</li>
                      <li>• Verify the API key has sufficient credits</li>
                      <li>• Make sure the API key is active on OpenRouter</li>
                      <li>• The app will still work with fallback analysis</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                API Test Information
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  This test sends a simple question to the GPT-OSS-20B model through OpenRouter. 
                  If successful, you'll see the AI's response. If it fails, check the error message 
                  and verify your API key and internet connection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APITest;
