const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const test = async () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("GEMINI_API_KEY missing");
        return;
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = "gemini-1.5-flash-latest";
    
    try {
        console.log(`Testing model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Say 'Hello, I am PrithviNet AI'");
        const response = await result.response;
        console.log(`SUCCESS:`, response.text());
    } catch (err) {
        console.error(`FAILED with ${modelName}:`, err.message);
    }
};

test();
