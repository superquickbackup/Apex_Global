
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getImmigrationAdvice = async (query: string, country: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `As a senior immigration consultant at Apex Global Immigration, provide high-level, legally precise advice regarding ${country}. Query: ${query}. Focus on compliance and strategic pathfinding.`,
      config: {
        systemInstruction: "You are a senior PHP system architect and legal-tech platform engineer. Respond with authority, precision, and the tone of a Big 4 consulting firm partner.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our consultants are currently reviewing the latest global regulatory updates. Please check back shortly for expert advice.";
  }
};

export const analyzeDocumentStatus = async (documentName: string) => {
  // Mock logic for document verification simulation
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze if the document named "${documentName}" typically meets standard visa requirements for high-security jurisdictions. Respond in one sentence.`,
  });
  return response.text;
};
