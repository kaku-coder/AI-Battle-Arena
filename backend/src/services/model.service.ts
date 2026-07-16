import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere"
import { ChatGroq } from "@langchain/groq";
import config from "../config/congi.js";


// judge 
export const gemini = new ChatGoogle({
    apiKey: config.GOOGLE_API_KEY,
    model: "gemini-2.0-flash",
    maxRetries: 0
});

// model 1
export const mistral = new ChatMistralAI({
    apiKey: config.MISTRAL_API_KEY,
    model: "mistral-large-latest",
    maxRetries: 0
});
// model 2
export const cohere = new ChatCohere({
    apiKey: config.COHERE_API_KEY,
    model: "command-r-plus-08-2024",
    maxRetries: 0
});


export const grow = new ChatGroq({
    apiKey: config.GROW_API_KEY,
    model: "llama-3.3-70b-versatile",
    maxRetries: 0
});


// Test invocations commented out to avoid blocking server start:
/*
const resGoogle = await gemini.invoke([
    ["system", "You are a contestant in an AI Battle. Give a smart, engaging, and competitive answer."]
]);

const resMistral = await mistral.invoke([
    ["system", "You are a contestant in an AI Battle. Give a smart, engaging, and competitive answer."]
]);

const resCohere = await cohere.invoke([
    ["system", "You are a contestant in an AI Battle. Give a smart, engaging, and competitive answer."]
]);

console.log(resGoogle.text, resMistral.text, resCohere.text);
*/
