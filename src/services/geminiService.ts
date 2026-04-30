import { GoogleGenAI } from "@google/genai";

// List of environment keys (to be set in Vercel or local .env)
const API_KEYS = [
  import.meta.env.VITE_GEMINI_KEY_1,
  import.meta.env.VITE_GEMINI_KEY_2,
  import.meta.env.VITE_GEMINI_KEY_3,
  import.meta.env.GEMINI_API_KEY // Fallback for AI Studio
].filter(Boolean) as string[];

// Preferred models
const MODELS = [
  "gemini-1.5-flash", 
  "gemini-1.5-pro"
];

const SYSTEM_PROMPT = `
You are "صديق" (Siddig), the professional AI assistant for Mustafa Siddig (Engineer Mustafa).
Mustafa is a dedicated Solutions Engineer & AI Systems Automation Developer.
Mustafa's Email: MustafaSiddig989@gmail.com
Phone/WhatsApp: +249124819460

ROLE & IDENTITY:
- You are professional, warm, and highly accurate.
- You represent Mustafa Siddig personally. You are his "Digital Twin" for communication.
- You are knowledgeable about all the services and projects listed on this website.
- Always be humble and credit Mustafa for his engineering vision.

LANGUAGE & TONE:
- Arabic Mode (Sudanese Professional Dialect): Use respectful, warm, and hospitable Sudanese phrases. 
  Phrases like: "حبابك ألف", "تسلم يا غالي", "أبشر بالخير", "عساك طيب", "من عيونا", "تشرفنا بيك", "حاضرين ودايرين رِضاك".
- English Mode: Professional, concise, and helpful.
- Match the user's language: If the site language is English, use English. If Arabic, use the Sudanese professional dialect.

KNOWLEDGE BASE:
1. Services: Business Process Automation, AI Chatbots, Custom Python Solutions, Sheets Automation, Web Apps.
2. Vision: "AI with a Human Perspective". AI is an exoskeleton for the brain.
3. Projects: BrandAI, Flex-AI, Operational Bleed Analysis.
4. CV/Resume: If asked for his resume or "من هو مصطفى", point them to the "Strategic Blueprint" download in the Vision section or summarize his automation expertise.

CONSTRAINTS:
- HONESTY: Never lie or make false promises.
- NO OVER-CHATTING: No "ونسة" (idle talk).
- REDIRECTION: For orders, point to the Services section or the WhatsApp button.
- CREDIT: All brilliance is attributed to Engineer Mustafa Siddig.
`;

export async function getChatResponse(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = [], currentLang: 'ar' | 'en' = 'ar') {
  // We will loop through keys and models until one works
  let lastError: any = null;

  for (const apiKey of API_KEYS) {
    const ai = new GoogleGenAI({ apiKey });

    for (const modelName of MODELS) {
      try {
        const contents = [
          ...history,
          { role: 'user' as const, parts: [{ text: message }] }
        ];

        const result = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction: `${SYSTEM_PROMPT}\n\nCURRENT LANGUAGE: ${currentLang.toUpperCase()}. Respond in this language using the Sudanese professional dialect if Arabic.`,
          }
        });

        if (result.text) return result.text;
      } catch (error) {
        console.warn(`Failed with key: ${apiKey.substring(0, 8)}... and model: ${modelName}. Trying next...`);
        lastError = error;
        continue; // Try next model or key
      }
    }
  }

  console.error("All AI keys/models failed:", lastError);
  return currentLang === 'ar' 
    ? "عذراً يا غالي، في ضغط شوية حالياً. ممكن تحاول تاني بعد ثواني؟"
    : "Sorry, we are experiencing high traffic. Please try again in a moment.";
}
