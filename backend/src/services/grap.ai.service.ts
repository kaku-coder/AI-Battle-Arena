import { HumanMessage } from "@langchain/core/messages";
import { StateGraph, Annotation, START, END } from "@langchain/langgraph";
import { z } from "zod";
import { mistral as MistralAI, cohere as Cohere, grow, gemini } from "./model.service.js";

// ==========================================
// STEP 1: DEFINE STATE SCHEMA (using Annotation API)
// ==========================================
const GraphState = Annotation.Root({
    problem: Annotation<string>({ reducer: (_, b) => b, default: () => "" }),
    solution_1: Annotation<string>({ reducer: (_, b) => b, default: () => "" }),
    solution_2: Annotation<string>({ reducer: (_, b) => b, default: () => "" }),
    judge: Annotation<{
        solution_1_score: number;
        solution_2_score: number;
        solution_1_response: string;
        solution_2_response: string;
    }>({
        reducer: (_, b) => b,
        default: () => ({
            solution_1_score: 0,
            solution_2_score: 0,
            solution_1_response: "",
            solution_2_response: ""
        })
    }),
    winner: Annotation<string>({ reducer: (_, b) => b, default: () => "" })
});

// ==========================================
// STEP 2: DEFINE STRUCTURED OUTPUT SCHEMA FOR JUDGE
// ==========================================
const JudgeResponseSchema = z.object({
    solution_1_score: z.number().min(0).max(10).describe("Score for solution 1 out of 10"),
    solution_2_score: z.number().min(0).max(10).describe("Score for solution 2 out of 10"),
    solution_1_response: z.string().describe("Reasoning for solution 1's score"),
    solution_2_response: z.string().describe("Reasoning for solution 2's score")
});

const JUDGE_SYSTEM_PROMPT = `you are the judge in the AI Battle between two AI models. 
your task is to see the problem and based on the problem you compare solutions between the two AIs and check which AI solution is better than the other AI. Also if you have to find and tell the AI to make a better solution you can ask the AI. Provide a score out of 10 for each solution along with your reasoning for the scores. You are an expert AI evaluator.

Compare Solution 1 and Solution 2.

Evaluate:

- Correctness
- Time Complexity
- Space Complexity
- Readability
- Scalability
- Best Practices

Provide a score out of 10 for each solution along with your reasoning. Return your response as JSON.`;

// ==========================================
// STEP 3: CREATE GRAPH NODES
// ==========================================

// Node A: Generate Solutions from both AI Models
async function generateSolutions(state: typeof GraphState.State) {
    const [mistralResponse, cohereResponse] = await Promise.all([
        MistralAI.invoke([
            ["system", "You are a contestant in an AI Battle. Give a smart, engaging, and competitive answer."],
            ["human", state.problem]
        ]),
        Cohere.invoke([
            ["system", "You are a contestant in an AI Battle. Give a smart, engaging, and competitive answer."],
            ["human", state.problem]
        ])
    ]);
    return {
        solution_1: typeof mistralResponse.content === "string" ? mistralResponse.content : JSON.stringify(mistralResponse.content),
        solution_2: typeof cohereResponse.content === "string" ? cohereResponse.content : JSON.stringify(cohereResponse.content)
    };
}

// Node B: Judge both solutions using structured output
async function judgeNode(state: typeof GraphState.State) {
    const { problem, solution_1, solution_2 } = state;

    const structuredJudge = grow.withStructuredOutput(JudgeResponseSchema).withFallbacks([
        gemini.withStructuredOutput(JudgeResponseSchema)
    ]);

    const parsedResponse = await structuredJudge.invoke([
        ["system", JUDGE_SYSTEM_PROMPT],
        new HumanMessage({
            content: JSON.stringify({
                problem,
                solution_1,
                solution_2
            })
        })
    ]);

    // Determine the winner
    let winner = "draw";
    if (parsedResponse.solution_1_score > parsedResponse.solution_2_score) {
        winner = "solution_1";
    } else if (parsedResponse.solution_2_score > parsedResponse.solution_1_score) {
        winner = "solution_2";
    }

    return {
        judge: {
            solution_1_score: parsedResponse.solution_1_score,
            solution_2_score: parsedResponse.solution_2_score,
            solution_1_response: parsedResponse.solution_1_response,
            solution_2_response: parsedResponse.solution_2_response
        },
        winner: winner
    };
}

// ==========================================
// STEP 4: DEFINE WORKFLOW EDGES & COMPILE GRAPH
// ==========================================
const workflow = new StateGraph(GraphState)
    .addNode("generateSolutions", generateSolutions)
    .addNode("judgeNode", judgeNode)
    .addEdge(START, "generateSolutions")
    .addEdge("generateSolutions", "judgeNode")
    .addEdge("judgeNode", END);

const app = workflow.compile();

// ==========================================
// STEP 5: RUNNER FUNCTION EXPORT
// ==========================================
export default async function runGraph(problem: string) {
    const finalState = await app.invoke({ problem });
    return finalState;
}