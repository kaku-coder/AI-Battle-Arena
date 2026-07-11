import { StateSchema, MessagesValue, type GraphNode, StateGraph, START, END } from "@langchain/langgraph";



type JUDGEMENT = {
    winner: "solution1" | "solution2" | "draw",
    judgement: string,
    reason: string,
    solution1_scrore: number,
    solution2_scrore: number
}

type AIBATTLESTATE = {
    message: typeof MessagesValue,
    solution1: string;
    solution2: string,
    judgement: JUDGEMENT
}

const state: AIBATTLESTATE = {
    messages: MessagesValue,
    solution1: "",
    solution2: "",
    judgement: {
        winner: "solution1",
        judgement: "",
        reason: "",
        solution1_scrore: 0,
        solution2_scrore: 0
    }
}

