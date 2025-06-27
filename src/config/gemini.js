// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
    GoogleGenAI,
  } from '@google/genai';
  
  async function main(prompt) {
    const ai = new GoogleGenAI({
      apiKey:import.meta.env.VITE_GEMINI_API_KEY, // Replace with your Gemini API key
    });
    const config = {
      thinkingConfig: {
        thinkingBudget: -1,
      },
      responseMimeType: 'text/plain',
    };
  
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    });
  console.log(response.text);
    return response.text;
   
  }
  
  export default main;
  