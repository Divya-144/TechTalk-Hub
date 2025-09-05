# TechTalk Hub

A comprehensive React.js application that explores the intersection of technology and society through interactive, AI-powered modules. Discover how AI impacts our daily lives, careers, and mental well-being.

## 🌟 Features

- **🤖 AI Ethics Module**: Analyze text for potential bias and unfairness in AI systems
- **🔒 Cybersecurity Module**: Detect sensitive information and explore privacy vs security balance
- **⚙️ Future of Work Analyzer**: Assess automation risks for any profession with personalized insights
- **🧠 Mental Health Module**: Analyze emotional tone and get AI-powered mental health recommendations
- **🔧 API Test Module**: Verify OpenRouter API connection and test AI responses

## 🚀 Technologies Used

- **React.js 18** - Modern React with hooks and functional components
- **React Router DOM** - Client-side routing for seamless navigation
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **OpenRouter API** - GPT-OSS-20B model for intelligent analysis
- **HTML5 & JavaScript (ES6+)** - Modern web standards

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone or download this project
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

1. Start the development server:

```bash
npm start
```

2. Open your browser and navigate to `http://localhost:3000`

3. The application will automatically reload when you make changes to the source files.

### Building for Production

To create a production build:

```bash
npm run build
```

This will create an optimized build in the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Navigation component
│   ├── Home.js            # Home page component
│   ├── AIEthics.js        # AI Ethics module
│   ├── Cybersecurity.js   # Cybersecurity module
│   ├── Automation.js      # Automation module
│   └── MentalHealth.js    # Mental Health module
├── App.js                 # Main app component with routing
├── index.js               # Entry point
└── index.css              # Global styles with Tailwind
```

## 📋 Detailed Module Overview

### 🤖 AI Ethics Module
**Purpose**: Analyze text for potential bias, unfairness, and discriminatory language in AI systems.

**Features**:
- **Real-time AI analysis** using GPT-OSS-20B model
- **Bias detection** with confidence levels (Low/Medium/High)
- **Detailed reasoning** explaining why text is fair or unfair
- **AI-generated suggestions** for improvement
- **Educational content** about AI ethics and transparency

**Example Test Inputs**:
```
High Bias: "This job is perfect for men who are strong and assertive"
Medium Bias: "We need someone young and energetic for this role"
Low Bias: "We are looking for qualified candidates with relevant experience"
```

### 🔒 Cybersecurity Module
**Purpose**: Detect sensitive personal information and explore the balance between privacy and security.

**Features**:
- **AI-powered privacy risk assessment** with intelligent pattern detection
- **Interactive Privacy ↔ Security Slider** showing real-time trade-offs
- **Comprehensive pattern detection** for emails, phones, SSNs, credit cards, addresses
- **Risk level classification** (Low/Medium/High) with detailed explanations
- **AI-generated recommendations** for data protection
- **Text highlighting** of sensitive information found

**Example Test Inputs**:
```
High Risk: "My name is John Smith, I live at 123 Main Street, New York, NY 10001. 
You can reach me at john.smith@email.com or call me at (555) 123-4567. 
My social security number is 123-45-6789 and my credit card is 4532-1234-5678-9012."

Medium Risk: "Please send the report to sarah.johnson@company.com by Friday. 
I'll be available at 555-9876 if you need to discuss."

Low Risk: "The weather is nice today. I had a great meeting with the team about our new project."
```

### ⚙️ Future of Work Analyzer
**Purpose**: Assess automation risks for any profession and provide personalized career insights.

**Features**:
- **Dual Analysis Modes**: Browse 30+ preset jobs or enter custom job titles
- **8 Job Categories**: Healthcare, Technology, Education, Creative, Business, Service, Transportation, Legal
- **Enhanced Custom Analysis**: Include skills and experience level for better insights
- **Visual Risk Assessment**: Animated progress bars and color-coded results
- **AI-Powered Recommendations**: Personalized career advice and future-proofing strategies
- **Comprehensive Results**: Risk scores, future outlook, and detailed analysis

**Example Test Scenarios**:

**Preset Jobs**:
- **High Risk**: Driver, Cashier, Data Entry Clerk
- **Medium Risk**: Accountant, Engineer, Writer, Salesperson
- **Low Risk**: Teacher, Doctor, Therapist, Artist

**Custom Jobs**:
```
Job Title: "Digital Marketing Manager"
Skills: "SEO, Analytics, Content Creation, Social Media"
Experience: "Mid Level (3-7 years)"
```

### 🧠 Mental Health Module
**Purpose**: Analyze emotional tone in text and provide AI-powered mental health recommendations.

**Features**:
- **AI-powered mood analysis** with confidence levels
- **Emotional tone detection** (Positive/Negative/Neutral)
- **Mood scoring** from -10 to +10
- **Multiple AI-generated tips** for mental health and well-being
- **Detailed analysis** explaining the emotional assessment
- **Fallback analysis** if API is unavailable

**Example Test Inputs**:
```
Positive: "I'm so excited about my new job! Everything is going great and I feel amazing!"

Negative: "I'm feeling really stressed and overwhelmed with work lately. Nothing seems to be going right."

Neutral: "Today was an ordinary day, nothing special happened. Just went to work and came home."
```

### 🔧 API Test Module
**Purpose**: Verify OpenRouter API connection and test AI response capabilities.

**Features**:
- **Real-time API testing** with live connection verification
- **Success/failure indicators** with detailed error messages
- **AI response display** showing actual model output
- **Troubleshooting tips** for API key issues
- **Connection status** monitoring

## Design Features

- **Mobile Responsive**: Works on all device sizes
- **Clean UI**: Card-based layout with Tailwind CSS
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Interactive Elements**: Hover effects, loading states, and smooth transitions

## AI Integration

This application uses **OpenRouter API** with the **GPT-OSS-20B model** to provide intelligent analysis:

- **Real-time AI Analysis**: All modules now use actual AI-powered analysis instead of simulated responses
- **Intelligent Recommendations**: Each module provides AI-generated suggestions and insights
- **Error Handling**: Graceful fallback to local analysis if the API is unavailable
- **Confidence Levels**: AI provides confidence scores for its analysis
- **Educational Value**: Users can see how AI analyzes different types of content

### API Configuration

The application is pre-configured with an OpenRouter API key for the GPT-OSS-20B model. The API calls are made from the `src/utils/openRouterAPI.js` file.

## 🧪 Comprehensive Testing Guide

### Step-by-Step Testing Instructions

#### 1. 🤖 AI Ethics Module Testing

**Navigate to**: `/ai-ethics`

**Test Case 1 - High Bias Detection**:
```
Input: "This job is perfect for men who are strong and assertive"
Expected: 
- Risk Level: Unfair
- Confidence: High/Medium
- AI Suggestions: Gender bias detected, suggestions for inclusive language
```

**Test Case 2 - Age Bias**:
```
Input: "We need someone young and energetic for this role"
Expected:
- Risk Level: Unfair  
- AI Suggestions: Age discrimination concerns, alternative phrasing
```

**Test Case 3 - Fair Text**:
```
Input: "We are looking for qualified candidates with relevant experience"
Expected:
- Risk Level: Fair
- Confidence: High
- AI Suggestions: Positive feedback on inclusive language
```

#### 2. 🔒 Cybersecurity Module Testing

**Navigate to**: `/cybersecurity`

**Test Case 1 - High Privacy Risk**:
```
Input: "My name is John Smith, I live at 123 Main Street, New York, NY 10001. 
You can reach me at john.smith@email.com or call me at (555) 123-4567. 
My social security number is 123-45-6789 and my credit card is 4532-1234-5678-9012."

Expected Results:
- Risk Level: High
- Sensitive Data Found: Name (1), Address (1), Email (1), Phone (1), SSN (1), CreditCard (1)
- Total Sensitive: 6
- AI Recommendations: Data protection strategies
- Highlighted Text: All sensitive information highlighted
```

**Test Case 2 - Medium Privacy Risk**:
```
Input: "Please send the report to sarah.johnson@company.com by Friday. 
I'll be available at 555-9876 if you need to discuss."

Expected Results:
- Risk Level: Medium
- Sensitive Data Found: Email (1), Phone (1)
- Total Sensitive: 2
- AI Recommendations: Basic privacy tips
```

**Test Case 3 - Low Privacy Risk**:
```
Input: "The weather is nice today. I had a great meeting with the team about our new project."

Expected Results:
- Risk Level: Low
- Sensitive Data Found: None
- Total Sensitive: 0
- AI Recommendations: General privacy awareness
```

**Test Case 4 - Privacy vs Security Slider**:
- Move slider to different positions (0-100)
- Observe how explanations change
- Test: Maximum Privacy, Balanced Approach, Maximum Security

#### 3. ⚙️ Future of Work Analyzer Testing

**Navigate to**: `/automation`

**Test Case 1 - Preset Job Analysis**:
1. Click "Browse Jobs" tab
2. Select "Technology & Engineering" category
3. Choose "Software Engineer"
4. Click "Analyze Automation Risk"

Expected Results:
- Risk Level: Medium
- Risk Score: 40-60
- Analysis: Detailed reasoning about automation impact
- Future Outlook: How the role might evolve
- AI Recommendations: Career development suggestions

**Test Case 2 - High Risk Job**:
1. Select "Transportation & Logistics" category
2. Choose "Driver"
3. Analyze

Expected Results:
- Risk Level: High
- Risk Score: 80-90
- Analysis: Autonomous vehicles impact
- Recommendations: Career transition advice

**Test Case 3 - Custom Job Analysis**:
1. Click "Custom Job" tab
2. Enter: "Digital Marketing Manager"
3. Add Skills: "SEO, Analytics, Content Creation, Social Media"
4. Select Experience: "Mid Level (3-7 years)"
5. Analyze

Expected Results:
- Personalized analysis based on skills and experience
- Risk assessment specific to marketing automation
- Recommendations tailored to the role and experience level
- Analysis Context section showing considered factors

**Test Case 4 - Low Risk Job**:
1. Select "Healthcare & Medical" category
2. Choose "Doctor" or "Therapist"
3. Analyze

Expected Results:
- Risk Level: Low
- Risk Score: 10-30
- Analysis: Human interaction and empathy requirements
- Recommendations: Focus on interpersonal skills

#### 4. 🧠 Mental Health Module Testing

**Navigate to**: `/mental-health`

**Test Case 1 - Positive Mood**:
```
Input: "I'm so excited about my new job! Everything is going great and I feel amazing!"

Expected Results:
- Mood Category: Positive
- Mood Score: +7 to +10
- Confidence: High
- AI Analysis: Detailed positive sentiment analysis
- Tips: Encouragement and positive reinforcement
```

**Test Case 2 - Negative Mood**:
```
Input: "I'm feeling really stressed and overwhelmed with work lately. Nothing seems to be going right."

Expected Results:
- Mood Category: Negative
- Mood Score: -7 to -10
- Confidence: High
- AI Analysis: Stress and overwhelm detection
- Tips: Coping strategies and support suggestions
```

**Test Case 3 - Neutral Mood**:
```
Input: "Today was an ordinary day, nothing special happened. Just went to work and came home."

Expected Results:
- Mood Category: Neutral
- Mood Score: -2 to +2
- Confidence: Medium
- AI Analysis: Neutral emotional state
- Tips: General well-being suggestions
```

#### 5. 🔧 API Test Module Testing

**Navigate to**: `/api-test`

**Test Steps**:
1. Click "Test API Connection" button
2. Wait for analysis (should take 2-3 seconds)
3. Observe results

**Expected Results**:
- Status: "API Test Successful!" (green checkmark)
- AI Response: Actual response from GPT-OSS-20B model
- Timestamp: Current time of test
- No error messages

**If API Fails**:
- Status: "API Test Failed" (red X)
- Error Details: Specific error message
- Troubleshooting Tips: How to fix the issue

## 🎯 Educational Value

This application serves as a comprehensive learning platform for understanding:

### 🤖 AI Ethics & Bias
- **Bias Detection**: Learn to identify discriminatory language and unfair practices
- **Inclusive Design**: Understand how to create fair and equitable systems
- **AI Transparency**: Explore the importance of explainable AI decisions

### 🔒 Privacy & Security
- **Data Protection**: Understand what constitutes sensitive information
- **Privacy Trade-offs**: Learn about the balance between security and privacy
- **Risk Assessment**: Develop skills in evaluating privacy risks

### ⚙️ Future of Work
- **Career Planning**: Make informed decisions about career paths
- **Skill Development**: Identify which skills will remain valuable
- **Automation Impact**: Understand how technology affects different professions

### 🧠 Mental Health & Technology
- **Digital Well-being**: Learn about technology's impact on mental health
- **Emotional Awareness**: Develop better understanding of emotional states
- **Coping Strategies**: Access AI-powered mental health recommendations

## 🚀 Key Features & Benefits

### For Students
- **Interactive Learning**: Hands-on experience with AI concepts
- **Real-world Applications**: See how AI impacts daily life
- **Career Guidance**: Make informed decisions about future paths

### For Professionals
- **Career Assessment**: Evaluate automation risks in current roles
- **Skill Development**: Identify areas for professional growth
- **Privacy Awareness**: Better understand data protection needs

### For Educators
- **Teaching Tool**: Use modules to explain AI concepts
- **Discussion Starter**: Generate conversations about technology's impact
- **Practical Examples**: Show real applications of AI ethics

## 🔧 Technical Features

### Performance
- **Fast Loading**: Optimized React components with lazy loading
- **Responsive Design**: Works seamlessly on all devices
- **Error Handling**: Graceful fallbacks when API is unavailable

### User Experience
- **Intuitive Navigation**: Clear, easy-to-use interface
- **Visual Feedback**: Loading states, progress bars, and animations
- **Accessibility**: Proper ARIA labels and keyboard navigation

### AI Integration
- **Real-time Analysis**: Live AI responses using OpenRouter API
- **Intelligent Fallbacks**: Local analysis when API is unavailable
- **Context Awareness**: AI considers user input and context

## 📱 Mobile Experience

The application is fully responsive and optimized for:
- **Mobile Phones** (320px+)
- **Tablets** (768px+)
- **Desktop** (1024px+)
- **Large Screens** (1440px+)

All modules work seamlessly across all device sizes with touch-friendly interfaces and optimized layouts.

## 🌟 Future Enhancements

Potential areas for future development:
- **User Accounts**: Save analysis history and preferences
- **Advanced Analytics**: More detailed reporting and insights
- **API Integration**: Additional AI models and services
- **Export Features**: Download analysis results
- **Multi-language Support**: Internationalization
- **Advanced Customization**: More personalization options

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.




cyberse - example text ::


1 ) low everything 
The weather is nice today. I had a great meeting with the team about our new project.

2) medium everything 
Please send the report to sarah.johnson@company.com by Friday. 
I'll be available at 555-9876 if you need to discuss.

3)High everythng :
My name is John Smith, I live at 123 Main Street, New York, NY 10001. 
You can reach me at john.smith@email.com or call me at (555) 123-4567. 
My social security number is 123-45-6789 and my credit card is 4532-1234-5678-9012.