import { AgentState, AgentType } from "./AgentTypes";

export interface AgentData {
  id: string;

  name: string;

  type: AgentType;

  state: AgentState;

  homeBuilding: string;

  currentBuilding: string;

  currentTask?: string;

  speed: number;

  color: string;
}

export const AgentRegistry: AgentData[] = [
  {
    id: "planner-1",
    name: "Planner Alpha",
    type: "planner",
    state: "idle",
    homeBuilding: "reasoning",
    currentBuilding: "reasoning",
    speed: 3,
    color: "#42A5F5",
  },

  {
    id: "memory-1",
    name: "Memory Alpha",
    type: "memory",
    state: "idle",
    homeBuilding: "memory",
    currentBuilding: "memory",
    speed: 2.8,
    color: "#66BB6A",
  },

  {
    id: "vision-1",
    name: "Vision Alpha",
    type: "vision",
    state: "idle",
    homeBuilding: "vision",
    currentBuilding: "vision",
    speed: 3,
    color: "#AB47BC",
  },

  {
    id: "tool-1",
    name: "Tool Alpha",
    type: "tool",
    state: "idle",
    homeBuilding: "tool",
    currentBuilding: "tool",
    speed: 3,
    color: "#FFA726",
  },

  {
    id: "execution-1",
    name: "Executor Alpha",
    type: "execution",
    state: "idle",
    homeBuilding: "execution",
    currentBuilding: "execution",
    speed: 3,
    color: "#EF5350",
  },
];