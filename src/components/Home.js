import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const modules = [
    {
      path: '/ai-ethics',
      title: 'AI Ethics',
      description: 'Governing AI - Check for bias in AI systems and understand ethical considerations.',
      icon: '🤖',
      color: 'blue'
    },
    {
      path: '/cybersecurity',
      title: 'Cybersecurity',
      description: 'Privacy vs Security - Analyze privacy risks and understand the balance between security and privacy.',
      icon: '🔒',
      color: 'green'
    },
    {
      path: '/automation',
      title: 'Automation',
      description: 'Workforce Impact - Assess automation risks for different job roles and explore future employment.',
      icon: '⚙️',
      color: 'purple'
    },
    {
      path: '/mental-health',
      title: 'Mental Health',
      description: 'Social Media Impact - Analyze mood from text and get tips for better mental health.',
      icon: '🧠',
      color: 'pink'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700',
      green: 'bg-green-50 border-green-200 hover:bg-green-100 text-green-700',
      purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-700',
      pink: 'bg-pink-50 border-pink-200 hover:bg-pink-100 text-pink-700'
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to TechTalk Hub
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore the intersection of technology and society through our interactive modules. 
          Learn about AI ethics, cybersecurity, automation, and mental health in the digital age.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((module) => (
          <Link
            key={module.path}
            to={module.path}
            className={`block p-6 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${getColorClasses(module.color)}`}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">{module.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{module.title}</h3>
              <p className="text-sm leading-relaxed">{module.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About TechTalk Hub</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            TechTalk Hub is designed to help you understand the complex relationship between technology and society. 
            Each module provides interactive tools and insights to explore different aspects of our digital world. 
            Whether you're a student, professional, or simply curious about technology's impact, these modules 
            offer practical knowledge and thought-provoking experiences.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <h3 className="font-semibold text-blue-800 mb-2">🤖 AI-Powered Analysis</h3>
            <p className="text-sm text-blue-700 mb-2">
              This app uses OpenRouter API with GPT-OSS-20B for intelligent analysis. 
              If the API is unavailable, each module includes fallback analysis methods.
            </p>
            <p className="text-xs text-blue-600">
              Test the API connection using the "API Test" link in the navigation menu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
