const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const test = async () => {
    console.log("--- Diagnostics Start ---");
    console.log("PORT:", process.env.PORT);
    console.log("GEMINI_API_KEY present:", !!process.env.GEMINI_API_KEY);
    console.log("Key prefix:", process.env.GEMINI_API_KEY?.substring(0, 4));
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    try {
        console.log("Fetching model list...");
        // In some versions of the library, listModels is available
        // but it might not be exported on the instance directly depending on the version
        // or it might require a specific client.
        // Let's just try to get a model and see if it throws immediately
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        console.log("Successfully got model instance");
        
        // Let's NOT make a network call yet, just check if we can.
    } catch (err) {
        console.error("DIAG ERROR:", err.message);
    }
    console.log("--- Diagnostics End ---");
};

test();
