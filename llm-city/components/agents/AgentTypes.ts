export type AgentType =
  | "planner"
  | "memory"
  | "knowledge"
  | "vision"
  | "tool"
  | "execution"
  | "communication"
  | "security";

export type AgentState =
  | "idle"
  | "walking"
  | "working"
  | "returning";