import React, { useState } from 'react';
import { analyzeMood } from '../utils/openRouterAPI';

const MentalHealth = () => {
  const [inputText, setInputText] = useState('');
  const [moodAnalysis, setMoodAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeMoodText = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text to analyze.');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const analysis = await analyzeMood(inputText);
      
      const moodColor = analysis.moodCategory === 'Positive' ? 'green' : 
                       analysis.moodCategory === 'Negative' ? 'red' : 'blue';
      
      const moodIcon = analysis.moodCategory === 'Positive' ? '😊' : 
                      analysis.moodCategory === 'Negative' ? '😔' : '😐';
      
      let tip = 'Consider engaging in activities that bring you joy or connecting with others to boost your mood.';
      if (analysis.moodCategory === 'Positive') {
        tip = 'Good job! Keep up the positive mindset and continue spreading good vibes!';
      } else if (analysis.moodCategory === 'Negative') {
        tip = 'Take a break from social media and consider talking to a friend or professional. Your mental health matters.';
      }
      
      setMoodAnalysis({
        category: analysis.moodCategory,
        color: moodColor,
        icon: moodIcon,
        tip: analysis.tips && analysis.tips.length > 0 ? analysis.tips[0] : tip,
        score: analysis.moodScore,
        confidence: analysis.confidence,
        analysis: analysis.analysis,
        allTips: analysis.tips || [tip],
        positiveCount: 0, // Will be calculated from analysis if needed
        negativeCount: 0,
        details: {
          exclamationCount: 0,
          questionCount: 0,
          capsCount: 0
        }
      });
    } catch (error) {
      console.error('Mood analysis error:', error);
      // Fallback to simple analysis if API fails
      const text = inputText.toLowerCase();
      
      // Simple keyword-based fallback
      const positiveKeywords = ['happy', 'joy', 'excited', 'great', 'amazing', 'wonderful', 'love', 'good', 'best'];
      const negativeKeywords = ['sad', 'depressed', 'angry', 'frustrated', 'upset', 'worried', 'stressed', 'terrible', 'awful'];
      
      const positiveCount = positiveKeywords.reduce((count, keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        const matches = text.match(regex);
        return count + (matches ? matches.length : 0);
      }, 0);
      
      const negativeCount = negativeKeywords.reduce((count, keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        const matches = text.match(regex);
        return count + (matches ? matches.length : 0);
      }, 0);
      
      const moodScore = positiveCount - negativeCount;
      let moodCategory, moodColor, moodIcon, tip;
      
      if (moodScore > 0) {
        moodCategory = 'Positive';
        moodColor = 'green';
        moodIcon = '😊';
        tip = 'Good job! Keep up the positive mindset!';
      } else if (moodScore < 0) {
        moodCategory = 'Negative';
        moodColor = 'red';
        moodIcon = '😔';
        tip = 'Take a break and consider talking to someone.';
      } else {
        moodCategory = 'Neutral';
        moodColor = 'blue';
        moodIcon = '😐';
        tip = 'Consider engaging in activities that bring you joy.';
      }
      
      setMoodAnalysis({
        category: moodCategory,
        color: moodColor,
        icon: moodIcon,
        tip,
        score: moodScore,
        confidence: 'Low',
        analysis: 'Basic keyword analysis (API unavailable)',
        allTips: [tip],
        positiveCount,
        negativeCount,
        details: {
          exclamationCount: 0,
          questionCount: 0,
          capsCount: 0
        }
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setMoodAnalysis(null);
    setInputText('');
  };

  const getMoodInsights = (analysis) => {
    const insights = [];
    
    if (analysis.positiveCount > 0) {
      insights.push(`Found ${analysis.positiveCount} positive word(s)`);
    }
    if (analysis.negativeCount > 0) {
      insights.push(`Found ${analysis.negativeCount} negative word(s)`);
    }
    if (analysis.details.exclamationCount > 2) {
      insights.push('High emotional intensity detected');
    }
    if (analysis.details.capsCount > inputText.length * 0.1) {
      insights.push('Strong emotional expression detected');
    }
    
    return insights.length > 0 ? insights : ['Text appears emotionally neutral'];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🧠 Social Media & Mental Health</h1>
          <p className="text-lg text-gray-600">
            Analyze mood from text and get tips for better mental health
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="mood-text" className="block text-sm font-medium text-gray-700 mb-2">
              Enter text to analyze your mood:
            </label>
            <textarea
              id="mood-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Share your thoughts, feelings, or recent experiences..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 resize-none"
            />
            <p className="mt-1 text-sm text-gray-500">
              This tool analyzes the emotional tone of your text to provide insights about your current mood.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={analyzeMoodText}
              disabled={isAnalyzing || !inputText.trim()}
              className="flex-1 bg-pink-600 text-white px-6 py-3 rounded-md font-medium hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
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
                'Analyze Mood'
              )}
            </button>
            
            {moodAnalysis && (
              <button
                onClick={resetAnalysis}
                className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Analyze New Text
              </button>
            )}
          </div>

          {moodAnalysis && (
            <div className="mt-6">
              <div className={`p-6 rounded-lg border-2 ${
                moodAnalysis.color === 'red' 
                  ? 'bg-red-50 border-red-200' 
                  : moodAnalysis.color === 'green'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{moodAnalysis.icon}</div>
                  <h3 className={`text-2xl font-bold mb-2 ${
                    moodAnalysis.color === 'red' 
                      ? 'text-red-800' 
                      : moodAnalysis.color === 'green'
                      ? 'text-green-800'
                      : 'text-blue-800'
                  }`}>
                    {moodAnalysis.category} Mood
                  </h3>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    Mood Score: {moodAnalysis.score > 0 ? '+' : ''}{moodAnalysis.score}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">💡 Mental Health Tip:</h4>
                    <p className={`text-lg ${
                      moodAnalysis.color === 'red' 
                        ? 'text-red-700' 
                        : moodAnalysis.color === 'green'
                        ? 'text-green-700'
                        : 'text-blue-700'
                    }`}>
                      {moodAnalysis.tip}
                    </p>
                  </div>

                  {moodAnalysis.analysis && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">AI Analysis:</h4>
                      <p className="text-sm text-gray-700 mb-4">{moodAnalysis.analysis}</p>
                    </div>
                  )}

                  {moodAnalysis.allTips && moodAnalysis.allTips.length > 1 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Additional Tips:</h4>
                      <ul className="space-y-1">
                        {moodAnalysis.allTips.slice(1).map((tip, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <span className="text-pink-500 mr-2">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Analysis Details:</h4>
                    <ul className="space-y-1">
                      {getMoodInsights(moodAnalysis).map((insight, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <span className="text-pink-500 mr-2">•</span>
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-50 rounded p-3">
                      <span className="font-medium text-green-600">Positive indicators:</span>
                      <span className="ml-2">{moodAnalysis.positiveCount}</span>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <span className="font-medium text-red-600">Negative indicators:</span>
                      <span className="ml-2">{moodAnalysis.negativeCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mental Health Resources */}
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-pink-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-pink-800">
                  Mental Health Resources
                </h3>
                <div className="mt-2 text-sm text-pink-700">
                  <p className="mb-2">
                    <strong>Remember:</strong> This tool is for educational purposes only and is not a substitute for professional mental health care.
                  </p>
                  <ul className="space-y-1">
                    <li>• If you're struggling, consider talking to a trusted friend or family member</li>
                    <li>• Professional help is available through therapists, counselors, or mental health hotlines</li>
                    <li>• Take breaks from social media and engage in activities that bring you joy</li>
                    <li>• Practice self-care and be kind to yourself</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealth;
