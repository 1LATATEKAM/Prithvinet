const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const test = async () => {
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    
    try {
        console.log("Attempting to list models...");
        // In @google/generative-ai, listModels might not be directly on genAI instance in all versions
        // but let's try a different approach: check if we can call any successful model
        // Actually, let's try the most basic one
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("test");
        const response = await result.response;
        console.log("SUCCESS with gemini-pro:", response.text());
    } catch (err) {
        console.error("FAILED with gemini-pro:", err.message);
    }
};

test();
