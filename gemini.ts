import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client with standard environment variable & telemetry agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "dummy-key",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export { ai };
