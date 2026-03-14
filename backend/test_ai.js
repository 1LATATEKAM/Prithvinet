const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const test = async () => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const models = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-1.5-pro", "gemini-1.0-pro"];
    
    console.log("Using API Key starting with:", process.env.GEMINI_API_KEY?.substring(0, 8));

    for (const modelName of models) {
        try {
            console.log(`\n--- Testing model: ${modelName} ---`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Say 'Hello'");
            const response = await result.response;
            console.log(`SUCCESS with ${modelName}:`, response.text());
            return; // Exit if one works
        } catch (err) {
            console.error(`FAILED with ${modelName}:`, err.message);
            if (err.response) {
                console.error("Response logic:", err.response);
            }
        }
    }
    console.log("\nAll tested models failed.");
};

test();

