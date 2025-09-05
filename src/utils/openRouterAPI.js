import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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",
  defaultHeaders: {
    "HTTP-Referer": "https://tech-talk-hub-9pws.vercel.app/",
    "X-Title": "TechTalk Hub",
  },
  dangerouslyAllowBrowser: true
});

export const callOpenRouter = async (messages, model = 'openai/gpt-oss-20b:free') => {
  try {
    const completion = await openai.chat.completions.create({
      model: model,
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter API Error:', error);
    
    // Check if it's an authentication error
    if (error.message && error.message.includes('User not found')) {
      throw new Error('API Key is invalid or expired. Please check your OpenRouter API key.');
    }
    
    throw error;
  }
};

// AI Ethics Analysis
export const analyzeBias = async (text) => {
  const messages = [
    {
      role: "system",
      content: "You are an AI ethics expert. Analyze the given text for potential bias, unfairness, or discriminatory language. You MUST respond with ONLY a valid JSON object in this exact format: {\"isFair\": boolean, \"confidence\": \"Low/Medium/High\", \"reason\": \"string\", \"suggestions\": [\"string1\", \"string2\"]}. Do not include any text before or after the JSON."
    },
    {
      role: "user",
      content: `Analyze this text for bias: "${text}"`
    }
  ];

  try {
    const response = await callOpenRouter(messages);
    console.log('AI Ethics Response:', response);
    
    // Try to extract JSON from the response
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(response);
    } catch (parseError) {
      // Try to find JSON in the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No valid JSON found in response');
      }
    }
    
    return jsonResponse;
  } catch (error) {
    console.error('AI Ethics Analysis Error:', error);
    // Fallback to simple analysis if API fails
    return {
      isFair: true,
      confidence: "Low",
      reason: "Unable to analyze due to API error. Please try again.",
      suggestions: ["Consider reviewing the text manually for potential bias."]
    };
  }
};

// Privacy Risk Analysis
export const analyzePrivacyRisk = async (text) => {
  const messages = [
    {
      role: "system",
      content: "You are a cybersecurity expert. Analyze the given text for sensitive personal information like emails, phone numbers, addresses, SSNs, credit cards, etc. You MUST respond with ONLY a valid JSON object in this exact format: {\"riskLevel\": \"Low/Medium/High\", \"foundSensitive\": [{\"type\": \"Email\", \"count\": 1}, {\"type\": \"Phone\", \"count\": 1}], \"totalSensitive\": 2, \"recommendations\": [\"string1\", \"string2\"]}. Use these exact type names: Email, Phone, SSN, CreditCard, Address, Name. Do not include any text before or after the JSON."
    },
    {
      role: "user",
      content: `Analyze this text for privacy risks: "${text}"`
    }
  ];

  try {
    const response = await callOpenRouter(messages);
    console.log('Privacy Risk Response:', response);
    
    // Try to extract JSON from the response
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(response);
    } catch (parseError) {
      console.log('JSON Parse Error:', parseError.message);
      console.log('Response length:', response.length);
      console.log('Response at position 718:', response.substring(715, 725));
      
      // Try to find JSON in the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          jsonResponse = JSON.parse(jsonMatch[0]);
        } catch (secondParseError) {
          console.log('Second JSON Parse Error:', secondParseError.message);
          // Try to fix common JSON issues
          let fixedJson = jsonMatch[0];
          // Fix common issues like missing quotes around keys
          fixedJson = fixedJson.replace(/(\w+):/g, '"$1":');
          try {
            jsonResponse = JSON.parse(fixedJson);
          } catch (thirdParseError) {
            throw new Error('Unable to parse JSON even after fixes');
          }
        }
      } else {
        throw new Error('No valid JSON found in response');
      }
    }
    
    // Ensure the response has the expected structure
    return {
      riskLevel: jsonResponse.riskLevel || 'Low',
      foundSensitive: jsonResponse.foundSensitive || [],
      totalSensitive: jsonResponse.totalSensitive || 0,
      recommendations: jsonResponse.recommendations || ['No specific recommendations available.']
    };
  } catch (error) {
    console.error('Privacy Risk Analysis Error:', error);
    return {
      riskLevel: "Low",
      foundSensitive: [],
      totalSensitive: 0,
      recommendations: ["Unable to analyze due to API error. Please try again."]
    };
  }
};

// Automation Risk Analysis
export const analyzeAutomationRisk = async (jobTitle) => {
  const messages = [
    {
      role: "system",
      content: "You are a workforce automation expert. Analyze the given job title for automation risk. You MUST respond with ONLY a valid JSON object in this exact format: {\"riskLevel\": \"Low/Medium/High\", \"riskScore\": number, \"reason\": \"string\", \"futureOutlook\": \"string\", \"recommendations\": [\"string1\", \"string2\"]}. Do not include any text before or after the JSON."
    },
    {
      role: "user",
      content: `Analyze automation risk for this job: "${jobTitle}"`
    }
  ];

  try {
    const response = await callOpenRouter(messages);
    console.log('Automation Risk Response:', response);
    
    // Try to extract JSON from the response
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(response);
    } catch (parseError) {
      // Try to find JSON in the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No valid JSON found in response');
      }
    }
    
    return jsonResponse;
  } catch (error) {
    console.error('Automation Risk Analysis Error:', error);
    return {
      riskLevel: "Medium",
      riskScore: 50,
      reason: "Unable to analyze due to API error. Please try again.",
      futureOutlook: "Consider upskilling in areas that complement automation.",
      recommendations: ["Focus on skills that are difficult to automate."]
    };
  }
};

// Mood Analysis
export const analyzeMood = async (text) => {
  const messages = [
    {
      role: "system",
      content: "You are a mental health counselor. Analyze the given text for emotional tone and mood. You MUST respond with ONLY a valid JSON object in this exact format: {\"moodCategory\": \"Positive/Negative/Neutral\", \"moodScore\": number, \"confidence\": \"Low/Medium/High\", \"analysis\": \"string\", \"tips\": [\"string1\", \"string2\"]}. Do not include any text before or after the JSON."
    },
    {
      role: "user",
      content: `Analyze the mood in this text: "${text}"`
    }
  ];

  try {
    const response = await callOpenRouter(messages);
    console.log('Mood Analysis Response:', response);
    
    // Try to extract JSON from the response
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(response);
    } catch (parseError) {
      // Try to find JSON in the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No valid JSON found in response');
      }
    }
    
    return jsonResponse;
  } catch (error) {
    console.error('Mood Analysis Error:', error);
    return {
      moodCategory: "Neutral",
      moodScore: 0,
      confidence: "Low",
      analysis: "Unable to analyze due to API error. Please try again.",
      tips: ["Consider taking a break and engaging in self-care activities."]
    };
  }
};
