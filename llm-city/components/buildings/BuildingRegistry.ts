export type BuildingType =
  | "reasoning"
  | "memory"
  | "knowledge"
  | "vision"
  | "tool"
  | "gateway"
  | "execution"
  | "analytics"
  | "security"
  | "communication"
  | "storage"
  | "compute"
  | "registry"
  | "research"
  | "agent"
  | "vector"
  | "context";

export interface BuildingData {
  id: string;
  name: string;
  type: BuildingType;

  position: [number, number, number];

  status: "online" | "offline" | "busy";

  capacity: number;

  agents: string[];

  queue: string[];

  description: string;
}

export const BuildingRegistry: BuildingData[] = [
  {
    id: "storage",
    name: "Storage Hub",
    type: "storage",
    position: [-20, 0, -20],
    status: "online",
    capacity: 10,
    agents: [],
    queue: [],
    description: "Stores datasets and project files.",
  },

  {
    id: "reasoning",
    name: "Reasoning Tower",
    type: "reasoning",
    position: [-30, 0, -30],
    status: "online",
    capacity: 20,
    agents: [],
    queue: [],
    description: "Responsible for planning and reasoning.",
  },

  {
    id: "code",
    name: "Code Forge",
    type: "tool",
    position: [-18, 0, -32],
    status: "online",
    capacity: 15,
    agents: [],
    queue: [],
    description: "Code generation and execution.",
  },

  {
    id: "vision",
    name: "Vision Lab",
    type: "vision",
    position: [-34, 0, -18],
    status: "online",
    capacity: 8,
    agents: [],
    queue: [],
    description: "Image understanding and generation.",
  },

  {
    id: "memory",
    name: "Memory Bank",
    type: "memory",
    position: [20, 0, -20],
    status: "online",
    capacity: 30,
    agents: [],
    queue: [],
    description: "Stores long-term memories.",
  },

  {
    id: "knowledge",
    name: "Knowledge Center",
    type: "knowledge",
    position: [30, 0, -30],
    status: "online",
    capacity: 20,
    agents: [],
    queue: [],
    description: "Knowledge retrieval and search.",
  },

  {
    id: "tool",
    name: "Tool Workshop",
    type: "tool",
    position: [18, 0, -32],
    status: "online",
    capacity: 15,
    agents: [],
    queue: [],
    description: "Runs external tools.",
  },

  {
    id: "inference",
    name: "Inference Hub",
    type: "reasoning",
    position: [34, 0, -18],
    status: "online",
    capacity: 15,
    agents: [],
    queue: [],
    description: "Runs inference pipelines.",
  },

  {
    id: "agent-hq",
    name: "Agent HQ",
    type: "agent",
    position: [-20, 0, 20],
    status: "online",
    capacity: 100,
    agents: [],
    queue: [],
    description: "Home of all autonomous agents.",
  },

  {
    id: "analytics",
    name: "Analytics Center",
    type: "analytics",
    position: [-30, 0, 30],
    status: "online",
    capacity: 10,
    agents: [],
    queue: [],
    description: "Tracks system metrics.",
  },

  {
    id: "research",
    name: "Research Center",
    type: "research",
    position: [-18, 0, 32],
    status: "online",
    capacity: 12,
    agents: [],
    queue: [],
    description: "Experimental AI research.",
  },

  {
    id: "security",
    name: "Security Hub",
    type: "security",
    position: [-34, 0, 18],
    status: "online",
    capacity: 10,
    agents: [],
    queue: [],
    description: "Security and permissions.",
  },

  {
    id: "gateway",
    name: "Gateway Center",
    type: "gateway",
    position: [20, 0, 20],
    status: "online",
    capacity: 15,
    agents: [],
    queue: [],
    description: "Handles API routing.",
  },

  {
    id: "execution",
    name: "Execution Tower",
    type: "execution",
    position: [30, 0, 30],
    status: "online",
    capacity: 20,
    agents: [],
    queue: [],
    description: "Executes final tasks.",
  },

  {
    id: "context",
    name: "Context Vault",
    type: "context",
    position: [18, 0, 32],
    status: "online",
    capacity: 15,
    agents: [],
    queue: [],
    description: "Stores conversation context.",
  },

  {
    id: "communication",
    name: "Communication Hub",
    type: "communication",
    position: [34, 0, 18],
    status: "online",
    capacity: 10,
    agents: [],
    queue: [],
    description: "Agent-to-agent messaging.",
  },

  {
    id: "compute",
    name: "Central Compute",
    type: "compute",
    position: [0, 0, -70],
    status: "online",
    capacity: 50,
    agents: [],
    queue: [],
    description: "Main compute cluster.",
  },

  {
    id: "cloud",
    name: "Cloud Exchange",
    type: "gateway",
    position: [70, 0, 0],
    status: "online",
    capacity: 20,
    agents: [],
    queue: [],
    description: "External cloud providers.",
  },

  {
    id: "vector",
    name: "Vector Vault",
    type: "vector",
    position: [-70, 0, 0],
    status: "online",
    capacity: 30,
    agents: [],
    queue: [],
    description: "Vector database storage.",
  },

  {
    id: "registry",
    name: "Model Registry",
    type: "registry",
    position: [0, 0, 70],
    status: "online",
    capacity: 20,
    agents: [],
    queue: [],
    description: "Registers available models.",
  },
];