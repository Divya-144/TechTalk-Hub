import React, { useState } from 'react';
import { analyzePrivacyRisk } from '../utils/openRouterAPI';

const Cybersecurity = () => {
  const [inputText, setInputText] = useState('');
  const [privacyRisk, setPrivacyRisk] = useState(null);
  const [sliderValue, setSliderValue] = useState(50);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const checkPrivacyRisk = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text to analyze.');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const analysis = await analyzePrivacyRisk(inputText);
      console.log('Privacy Risk Analysis Result:', analysis);
      
      // Convert API response to component format
      const riskColor = analysis.riskLevel === 'High' ? 'red' : 
                       analysis.riskLevel === 'Medium' ? 'yellow' : 'green';
      
      setPrivacyRisk({
        level: analysis.riskLevel,
        color: riskColor,
        foundSensitive: analysis.foundSensitive || [],
        totalSensitive: analysis.totalSensitive || 0,
        recommendations: analysis.recommendations || [],
        highlightedText: highlightSensitiveInfo(inputText, analysis.foundSensitive || [])
      });
    } catch (error) {
      console.error('Privacy risk analysis error:', error);
      setPrivacyRisk({
        level: 'Low',
        color: 'green',
        foundSensitive: [],
        totalSensitive: 0,
        recommendations: ['Unable to analyze due to an error. Please try again.'],
        highlightedText: inputText
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const highlightSensitiveInfo = (text, foundSensitive) => {
    if (!foundSensitive || !Array.isArray(foundSensitive)) {
      return text;
    }
    
    let highlightedText = text;
    
    // Define patterns for different types of sensitive information
    const patterns = {
      'Email': /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
      'Phone': /(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/g,
      'SSN': /\b\d{3}-?\d{2}-?\d{4}\b/g,
      'CreditCard': /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
      'Address': /\b\d+\s+[A-Za-z\s]+(?:Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Lane|Ln|Boulevard|Blvd)\b/gi,
      'Name': /\b[A-Z][a-z]+\s+[A-Z][a-z]+\b/g
    };
    
    foundSensitive.forEach(item => {
      if (item && item.type && patterns[item.type]) {
        const pattern = patterns[item.type];
        highlightedText = highlightedText.replace(pattern, (match) => 
          `<mark class="bg-yellow-200 px-1 rounded">${match}</mark>`
        );
      }
    });
    
    return highlightedText;
  };

  const getSliderExplanation = (value) => {
    if (value < 25) {
      return {
        title: 'Maximum Privacy',
        description: 'Prioritizes user privacy with minimal data collection, strong encryption, and user control over personal information.',
        color: 'blue'
      };
    } else if (value < 75) {
      return {
        title: 'Balanced Approach',
        description: 'Strikes a balance between security and privacy, collecting necessary data while protecting user rights.',
        color: 'purple'
      };
    } else {
      return {
        title: 'Maximum Security',
        description: 'Prioritizes security with extensive monitoring, data collection, and surveillance for threat prevention.',
        color: 'red'
      };
    }
  };

  const resetAnalysis = () => {
    setPrivacyRisk(null);
    setInputText('');
  };

  const sliderExplanation = getSliderExplanation(sliderValue);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🔒 Cybersecurity vs Privacy</h1>
          <p className="text-lg text-gray-600">
            Analyze privacy risks and understand the balance between security and privacy
          </p>
        </div>

        <div className="space-y-8">
          {/* Privacy Risk Analysis */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Privacy Risk Analysis</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="privacy-text" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter text to check for sensitive information:
                </label>
                <input
                  id="privacy-text"
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter text containing personal information..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={checkPrivacyRisk}
                  disabled={isAnalyzing || !inputText.trim()}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
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
                    'Check Privacy Risk'
                  )}
                </button>
                
                {privacyRisk && (
                  <button
                    onClick={resetAnalysis}
                    className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    Analyze New Text
                  </button>
                )}
              </div>

              {privacyRisk && (
                <div className="mt-6">
                  <div className={`p-6 rounded-lg border-2 ${
                    privacyRisk.color === 'red' 
                      ? 'bg-red-50 border-red-200' 
                      : privacyRisk.color === 'yellow'
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <div className="text-center mb-4">
                      <div className={`text-4xl mb-2 ${
                        privacyRisk.color === 'red' 
                          ? 'text-red-600' 
                          : privacyRisk.color === 'yellow'
                          ? 'text-yellow-600'
                          : 'text-green-600'
                      }`}>
                        {privacyRisk.color === 'red' ? '🚨' : privacyRisk.color === 'yellow' ? '⚠️' : '✅'}
                      </div>
                      <h3 className={`text-2xl font-bold ${
                        privacyRisk.color === 'red' 
                          ? 'text-red-800' 
                          : privacyRisk.color === 'yellow'
                          ? 'text-yellow-800'
                          : 'text-green-800'
                      }`}>
                        {privacyRisk.level} Privacy Risk
                      </h3>
                      <p className={`text-lg ${
                        privacyRisk.color === 'red' 
                          ? 'text-red-700' 
                          : privacyRisk.color === 'yellow'
                          ? 'text-yellow-700'
                          : 'text-green-700'
                      }`}>
                        Found {privacyRisk.totalSensitive} sensitive data point(s)
                      </p>
                    </div>

                    {privacyRisk.foundSensitive.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Detected sensitive information:</h4>
                        <ul className="space-y-1">
                          {privacyRisk.foundSensitive.map((item, index) => (
                            <li key={index} className="text-sm text-gray-700">
                              • {item.type}: {item.count || 0} found
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 p-3 bg-gray-100 rounded">
                          <h5 className="font-medium text-gray-900 mb-2">Highlighted text:</h5>
                          <div 
                            className="text-sm"
                            dangerouslySetInnerHTML={{ __html: privacyRisk.highlightedText }}
                          />
                        </div>
                      </div>
                    )}

                    {privacyRisk.recommendations && privacyRisk.recommendations.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-900 mb-2">AI Recommendations:</h4>
                        <ul className="space-y-1">
                          {privacyRisk.recommendations.map((recommendation, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              {recommendation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Privacy vs Security Slider */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Privacy ↔ Security Balance</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="mb-6">
                <label htmlFor="privacy-security-slider" className="block text-sm font-medium text-gray-700 mb-2">
                  Adjust the balance between Privacy and Security:
                </label>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-blue-600">Privacy</span>
                  <input
                    id="privacy-security-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-sm font-medium text-red-600">Security</span>
                </div>
                <div className="text-center mt-2">
                  <span className="text-sm text-gray-600">Current value: {sliderValue}%</span>
                </div>
              </div>

              <div className={`p-4 rounded-lg border-2 ${
                sliderExplanation.color === 'blue' 
                  ? 'bg-blue-50 border-blue-200' 
                  : sliderExplanation.color === 'purple'
                  ? 'bg-purple-50 border-purple-200'
                  : 'bg-red-50 border-red-200'
              }`}>
                <h3 className={`text-lg font-semibold mb-2 ${
                  sliderExplanation.color === 'blue' 
                    ? 'text-blue-800' 
                    : sliderExplanation.color === 'purple'
                    ? 'text-purple-800'
                    : 'text-red-800'
                }`}>
                  {sliderExplanation.title}
                </h3>
                <p className={`text-sm ${
                  sliderExplanation.color === 'blue' 
                    ? 'text-blue-700' 
                    : sliderExplanation.color === 'purple'
                    ? 'text-purple-700'
                    : 'text-red-700'
                }`}>
                  {sliderExplanation.description}
                </p>
              </div>
            </div>
          </div>

          {/* Educational Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Understanding the Balance
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    The relationship between privacy and security is complex. While both are important, 
                    they often require trade-offs. Organizations must carefully balance data protection 
                    with security measures to maintain user trust while preventing threats.
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

export default Cybersecurity;
