import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere"
import config from "../config/congi.js";



const gemini = new ChatGoogle({
    apiKey: config.GOOGLE_API_KEY,
    model: "gemini-2.5-flash"
});
const mistral = new ChatMistralAI({
    apiKey: config.MISTRAL_API_KEY,
    model: "mistral-large-latest",
    temperature: 0,
    maxRetries: 2,
});
const cohere = new ChatCohere({
    model: "command-r-plus-08-2024",
    temperature: 0,
    maxRetries: 2,
})

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