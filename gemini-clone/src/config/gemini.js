 
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyCmlWCYted4EqGNTLUzRFP42KjD5OqPFa0";

async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW,
    },
    
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });  

  const result = await chat.sendMessage(prompt);
  const response = result.response;
  return response.text(); 
}

module.exports = runChat