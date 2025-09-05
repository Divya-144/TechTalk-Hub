import React, { useState } from 'react';
import { analyzeAutomationRisk } from '../utils/openRouterAPI';

const Automation = () => {
  const [selectedJob, setSelectedJob] = useState('');
  const [customJob, setCustomJob] = useState('');
  const [automationRisk, setAutomationRisk] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisMode, setAnalysisMode] = useState('preset'); // 'preset' or 'custom'
  const [jobSkills, setJobSkills] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('entry');

  const jobCategories = [
    {
      name: 'Healthcare & Medical',
      jobs: [
        { value: 'doctor', label: 'Doctor', icon: '🩺' },
        { value: 'nurse', label: 'Nurse', icon: '👩‍⚕️' },
        { value: 'therapist', label: 'Therapist', icon: '🧠' },
        { value: 'pharmacist', label: 'Pharmacist', icon: '💊' },
        { value: 'dentist', label: 'Dentist', icon: '🦷' }
      ]
    },
    {
      name: 'Technology & Engineering',
      jobs: [
        { value: 'software-engineer', label: 'Software Engineer', icon: '💻' },
        { value: 'data-scientist', label: 'Data Scientist', icon: '📊' },
        { value: 'cybersecurity', label: 'Cybersecurity Expert', icon: '🔒' },
        { value: 'ai-engineer', label: 'AI Engineer', icon: '🤖' },
        { value: 'devops', label: 'DevOps Engineer', icon: '⚙️' }
      ]
    },
    {
      name: 'Education & Training',
      jobs: [
        { value: 'teacher', label: 'Teacher', icon: '👩‍🏫' },
        { value: 'professor', label: 'Professor', icon: '🎓' },
        { value: 'trainer', label: 'Corporate Trainer', icon: '📚' },
        { value: 'tutor', label: 'Tutor', icon: '✏️' }
      ]
    },
    {
      name: 'Creative & Arts',
      jobs: [
        { value: 'artist', label: 'Artist', icon: '🎨' },
        { value: 'writer', label: 'Writer', icon: '✍️' },
        { value: 'designer', label: 'Designer', icon: '🎨' },
        { value: 'musician', label: 'Musician', icon: '🎵' },
        { value: 'photographer', label: 'Photographer', icon: '📸' }
      ]
    },
    {
      name: 'Business & Finance',
      jobs: [
        { value: 'accountant', label: 'Accountant', icon: '🧮' },
        { value: 'financial-analyst', label: 'Financial Analyst', icon: '📈' },
        { value: 'consultant', label: 'Consultant', icon: '💼' },
        { value: 'manager', label: 'Manager', icon: '👔' }
      ]
    },
    {
      name: 'Service & Retail',
      jobs: [
        { value: 'cashier', label: 'Cashier', icon: '🛒' },
        { value: 'salesperson', label: 'Salesperson', icon: '💬' },
        { value: 'customer-service', label: 'Customer Service', icon: '📞' },
        { value: 'waiter', label: 'Waiter/Waitress', icon: '🍽️' }
      ]
    },
    {
      name: 'Transportation & Logistics',
      jobs: [
        { value: 'driver', label: 'Driver', icon: '🚗' },
        { value: 'pilot', label: 'Pilot', icon: '✈️' },
        { value: 'logistics', label: 'Logistics Coordinator', icon: '📦' }
      ]
    },
    {
      name: 'Legal & Professional',
      jobs: [
        { value: 'lawyer', label: 'Lawyer', icon: '⚖️' },
        { value: 'paralegal', label: 'Paralegal', icon: '📋' },
        { value: 'judge', label: 'Judge', icon: '👨‍⚖️' }
      ]
    }
  ];


  const checkAutomationRisk = async () => {
    const jobToAnalyze = analysisMode === 'preset' ? selectedJob : customJob;
    
    if (!jobToAnalyze.trim()) {
      alert('Please select a job or enter a custom job title to analyze.');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      let jobTitle, jobIcon, jobCategory;
      
      if (analysisMode === 'preset') {
        // Find job in categories
        let foundJob = null;
        for (const category of jobCategories) {
          foundJob = category.jobs.find(job => job.value === selectedJob);
          if (foundJob) {
            jobTitle = foundJob.label;
            jobIcon = foundJob.icon;
            jobCategory = category.name;
            break;
          }
        }
      } else {
        jobTitle = customJob;
        jobIcon = '💼';
        jobCategory = 'Custom';
      }

      // Create enhanced analysis prompt with skills and experience
      const analysisPrompt = analysisMode === 'preset' 
        ? `${jobTitle} (${jobCategory})`
        : `${jobTitle}${jobSkills ? ` - Skills: ${jobSkills}` : ''}${experienceLevel ? ` - Experience: ${experienceLevel}` : ''}`;

      const analysis = await analyzeAutomationRisk(analysisPrompt);
      
      const riskColor = analysis.riskLevel === 'High' ? 'red' : 
                       analysis.riskLevel === 'Medium' ? 'yellow' : 'green';
      
      const riskIcon = analysis.riskLevel === 'High' ? '🚨' : 
                      analysis.riskLevel === 'Medium' ? '⚠️' : '✅';
      
      let riskMessage = 'Low automation risk - your job is relatively safe from automation.';
      if (analysis.riskLevel === 'Medium') {
        riskMessage = 'Medium automation risk - some tasks may be automated, but core skills remain valuable.';
      } else if (analysis.riskLevel === 'High') {
        riskMessage = 'High automation risk - significant portions of this job may be automated soon.';
      }

      setAutomationRisk({
        job: { label: jobTitle, icon: jobIcon, category: jobCategory },
        riskLevel: analysis.riskLevel,
        riskScore: analysis.riskScore,
        reason: analysis.reason,
        futureOutlook: analysis.futureOutlook,
        recommendations: analysis.recommendations || [],
        riskColor,
        riskIcon,
        riskMessage,
        analysisMode,
        jobSkills,
        experienceLevel
      });
    } catch (error) {
      console.error('Automation risk analysis error:', error);
      // Fallback to simple analysis
      const jobTitle = analysisMode === 'preset' ? 
        jobCategories.flatMap(cat => cat.jobs).find(job => job.value === selectedJob)?.label || 'Unknown' :
        customJob;

      setAutomationRisk({
        job: { label: jobTitle, icon: '💼', category: 'Unknown' },
        riskLevel: 'Medium',
        riskScore: 50,
        reason: 'Unable to analyze due to API error. Please try again.',
        futureOutlook: 'Consider upskilling in areas that complement automation.',
        recommendations: ['Focus on skills that are difficult to automate.'],
        riskColor: 'yellow',
        riskIcon: '⚠️',
        riskMessage: 'Medium automation risk - some tasks may be automated, but core skills remain valuable.',
        analysisMode,
        jobSkills,
        experienceLevel
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setAutomationRisk(null);
    setSelectedJob('');
  };

  const getFutureJobTips = (riskLevel) => {
    const tips = {
      Low: [
        'Continue developing emotional intelligence and interpersonal skills',
        'Focus on complex problem-solving and creative thinking',
        'Build strong human relationships and trust',
        'Stay updated with technology that enhances your work'
      ],
      Medium: [
        'Learn to work alongside AI and automation tools',
        'Develop skills that complement technology',
        'Focus on areas that require human judgment',
        'Consider upskilling in emerging technologies'
      ],
      High: [
        'Consider transitioning to related roles with lower automation risk',
        'Develop skills in managing and maintaining automated systems',
        'Focus on human oversight and quality control',
        'Explore opportunities in training and supporting automation'
      ]
    };
    return tips[riskLevel] || tips.Medium;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">⚙️ Future of Work Analyzer</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how AI and automation will impact your career. Get personalized insights, 
            skill recommendations, and future-proofing strategies for any profession.
          </p>
        </div>

        {/* Analysis Mode Toggle */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => setAnalysisMode('preset')}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                  analysisMode === 'preset'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📋 Browse Jobs
              </button>
              <button
                onClick={() => setAnalysisMode('custom')}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                  analysisMode === 'custom'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                ✍️ Custom Job
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Preset Job Selection */}
          {analysisMode === 'preset' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose a Job Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">{category.name}</h3>
                    <div className="space-y-2">
                      {category.jobs.map((job) => (
                        <button
                          key={job.value}
                          onClick={() => setSelectedJob(job.value)}
                          className={`w-full text-left p-3 rounded-md transition-all duration-200 ${
                            selectedJob === job.value
                              ? 'bg-purple-100 border-2 border-purple-500 text-purple-900'
                              : 'bg-white border border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{job.icon}</span>
                            <span className="font-medium">{job.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Job Input */}
          {analysisMode === 'custom' && (
            <div className="space-y-6">
              <div>
                <label htmlFor="custom-job" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your job title or role:
                </label>
                <input
                  id="custom-job"
                  type="text"
                  value={customJob}
                  onChange={(e) => setCustomJob(e.target.value)}
                  placeholder="e.g., Marketing Manager, Data Analyst, UX Designer..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="job-skills" className="block text-sm font-medium text-gray-700 mb-2">
                    Key skills (optional):
                  </label>
                  <input
                    id="job-skills"
                    type="text"
                    value={jobSkills}
                    onChange={(e) => setJobSkills(e.target.value)}
                    placeholder="e.g., Python, Leadership, Design..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label htmlFor="experience-level" className="block text-sm font-medium text-gray-700 mb-2">
                    Experience level:
                  </label>
                  <select
                    id="experience-level"
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid Level (3-7 years)</option>
                    <option value="senior">Senior Level (8+ years)</option>
                    <option value="executive">Executive Level</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Analysis Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={checkAutomationRisk}
              disabled={isAnalyzing || (!selectedJob && !customJob.trim())}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Future Impact...
                </span>
              ) : (
                '🔮 Analyze Automation Risk'
              )}
            </button>
            
            {automationRisk && (
              <button
                onClick={resetAnalysis}
                className="flex-1 bg-gray-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
              >
                🔄 Analyze Different Job
              </button>
            )}
          </div>

          {automationRisk && (
            <div className="mt-8 space-y-6">
              {/* Main Results Card */}
              <div className={`p-8 rounded-xl border-2 ${
                automationRisk.riskColor === 'red' 
                  ? 'bg-gradient-to-br from-red-50 to-red-100 border-red-200' 
                  : automationRisk.riskColor === 'yellow'
                  ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200'
                  : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
              }`}>
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">{automationRisk.riskIcon}</div>
                  <h3 className={`text-3xl font-bold mb-3 ${
                    automationRisk.riskColor === 'red' 
                      ? 'text-red-800' 
                      : automationRisk.riskColor === 'yellow'
                      ? 'text-yellow-800'
                      : 'text-green-800'
                  }`}>
                    {automationRisk.riskLevel} Automation Risk
                  </h3>
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-4xl mr-3">{automationRisk.job.icon}</span>
                    <div>
                      <p className="text-xl font-semibold text-gray-800">{automationRisk.job.label}</p>
                      <p className="text-sm text-gray-600">{automationRisk.job.category}</p>
                    </div>
                  </div>
                  
                  {/* Risk Score with Visual Bar */}
                  <div className="max-w-md mx-auto">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Low Risk</span>
                      <span className="font-semibold">Risk Score: {automationRisk.riskScore}/100</span>
                      <span>High Risk</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          automationRisk.riskColor === 'red' 
                            ? 'bg-gradient-to-r from-red-400 to-red-600' 
                            : automationRisk.riskColor === 'yellow'
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                            : 'bg-gradient-to-r from-green-400 to-green-600'
                        }`}
                        style={{ width: `${automationRisk.riskScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Analysis Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">📊 Analysis</h4>
                    <p className="text-gray-700 leading-relaxed">{automationRisk.reason}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">🎯 Risk Assessment</h4>
                    <p className={`font-medium ${
                      automationRisk.riskColor === 'red' 
                        ? 'text-red-700' 
                        : automationRisk.riskColor === 'yellow'
                        ? 'text-yellow-700'
                        : 'text-green-700'
                    }`}>
                      {automationRisk.riskMessage}
                    </p>
                  </div>
                </div>
              </div>

              {/* Future Outlook */}
              {automationRisk.futureOutlook && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="font-bold text-blue-900 mb-3 text-lg flex items-center">
                    🔮 Future Outlook
                  </h4>
                  <p className="text-blue-800 leading-relaxed">{automationRisk.futureOutlook}</p>
                </div>
              )}

              {/* AI Recommendations */}
              {automationRisk.recommendations && automationRisk.recommendations.length > 0 && (
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <h4 className="font-bold text-purple-900 mb-4 text-lg flex items-center">
                    💡 AI-Powered Recommendations
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {automationRisk.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start p-3 bg-white rounded-lg border border-purple-100">
                        <span className="text-purple-500 mr-3 mt-1 text-lg">💡</span>
                        <p className="text-purple-800 text-sm leading-relaxed">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills & Experience Context */}
              {(automationRisk.analysisMode === 'custom' && (automationRisk.jobSkills || automationRisk.experienceLevel)) && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center">
                    📝 Analysis Context
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {automationRisk.jobSkills && (
                      <div>
                        <span className="font-semibold text-gray-700">Skills Considered:</span>
                        <p className="text-gray-600 mt-1">{automationRisk.jobSkills}</p>
                      </div>
                    )}
                    {automationRisk.experienceLevel && (
                      <div>
                        <span className="font-semibold text-gray-700">Experience Level:</span>
                        <p className="text-gray-600 mt-1 capitalize">{automationRisk.experienceLevel.replace('-', ' ')}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Fallback Tips */}
              {(!automationRisk.recommendations || automationRisk.recommendations.length === 0) && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                  <h4 className="font-bold text-indigo-900 mb-4 text-lg flex items-center">
                    🚀 Future-Proofing Tips
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getFutureJobTips(automationRisk.riskLevel).map((tip, index) => (
                      <div key={index} className="flex items-start p-3 bg-white rounded-lg border border-indigo-100">
                        <span className="text-indigo-500 mr-3 mt-1 text-lg">🎯</span>
                        <p className="text-indigo-800 text-sm leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

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
                  About Future Jobs
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    <strong>Automation is changing the workforce.</strong> While some jobs may be automated, 
                    new opportunities are emerging. Focus on developing skills that complement technology, 
                    such as creativity, emotional intelligence, and complex problem-solving. The key is 
                    to adapt and continuously learn new skills that remain uniquely human.
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

export default Automation;
