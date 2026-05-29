const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

class AIService {
  async generateInterviewQuestions(jobRole, experienceLevel, interviewType) {
    const prompt = `Generate a ${experienceLevel} level ${interviewType} interview for a ${jobRole} position. 
    Include 8 questions with follow-up questions for each. Format as JSON with structure:
    {
      "questions": [
        {
          "id": 1,
          "question": "question text",
          "followUp": "follow-up question",
          "expectedKeywords": ["keyword1", "keyword2"],
          "difficulty": "easy/medium/hard"
        }
      ]
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return JSON.parse(response.choices[0].message.content);
  }

  async evaluateAnswer(question, userAnswer, expectedKeywords) {
    const prompt = `Evaluate this interview answer and provide detailed feedback.
    
    Question: ${question}
    Expected Keywords: ${expectedKeywords.join(', ')}
    User Answer: ${userAnswer}
    
    Provide response as JSON:
    {
      "score": 0-100,
      "feedback": "detailed feedback",
      "strengths": ["strength1", "strength2"],
      "weaknesses": ["weakness1", "weakness2"],
      "improvement": "improvement suggestions",
      "categories": {
        "technicalKnowledge": 0-100,
        "communicationSkills": 0-100,
        "confidence": 0-100,
        "problemSolving": 0-100,
        "clarity": 0-100
      }
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    });

    return JSON.parse(response.choices[0].message.content);
  }

  async analyzeResume(resumeText) {
    const prompt = `Analyze this resume for ATS optimization and provide detailed feedback.
    
    Resume Content: ${resumeText.substring(0, 3000)}
    
    Provide response as JSON:
    {
      "atsScore": 0-100,
      "presentSkills": ["skill1", "skill2"],
      "missingSkills": ["skill3", "skill4"],
      "grammarIssues": ["issue1"],
      "recommendations": ["recommendation1"],
      "strengthAreas": ["area1"],
      "improvementAreas": ["area2"],
      "summary": "Overall assessment"
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    return JSON.parse(response.choices[0].message.content);
  }

  async generateHints(challenge, userCode, language) {
    const prompt = `Generate 3 helpful hints for this coding challenge.
    
    Challenge: ${challenge}
    User's Code (${language}): ${userCode}
    
    Provide hints as JSON array: ["hint1", "hint2", "hint3"]`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
    });

    return JSON.parse(response.choices[0].message.content);
  }
}

module.exports = new AIService();