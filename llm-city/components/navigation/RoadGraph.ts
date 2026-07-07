export interface RoadNode {
  id: string;
  position: [number, number, number];

  neighbors: string[];
}



export const RoadGraph: RoadNode[] = [


  {
    id: "N1",
    position: [-40, 0.2, -40],
    neighbors: ["N2", "N5"],
  },

  {
    id: "N2",
    position: [0, 0.2, -40],
    neighbors: ["N1", "N3", "N6"],
  },

  {
    id: "N3",
    position: [40, 0.2, -40],
    neighbors: ["N2", "N7"],
  },



  {
    id: "N4",
    position: [-40, 0.2, -20],
    neighbors: ["N5", "N8"],
  },

  {
    id: "N5",
    position: [-40, 0.2, 0],
    neighbors: ["N1", "N4", "N6", "N9"],
  },

  {
    id: "N6",
    position: [0, 0.2, 0],
    neighbors: ["N2", "N5", "N7", "N10"],
  },

  {
    id: "N7",
    position: [40, 0.2, 0],
    neighbors: ["N3", "N6", "N11"],
  },



  {
    id: "N8",
    position: [-40, 0.2, 20],
    neighbors: ["N4", "N9", "N12"],
  },

  {
    id: "N9",
    position: [-40, 0.2, 40],
    neighbors: ["N5", "N8", "N10", "N13"],
  },

  {
    id: "N10",
    position: [0, 0.2, 40],
    neighbors: ["N6", "N9", "N11", "N14"],
  },

  {
    id: "N11",
    position: [40, 0.2, 40],
    neighbors: ["N7", "N10", "N15"],
  },



  {
    id: "N12",
    position: [-40, 0.2, 60],
    neighbors: ["N8", "N13"],
  },

  {
    id: "N13",
    position: [0, 0.2, 60],
    neighbors: ["N12", "N14", "N9"],
  },

  {
    id: "N14",
    position: [40, 0.2, 60],
    neighbors: ["N13", "N15", "N10"],
  },

  {
    id: "N15",
    position: [60, 0.2, 60],
    neighbors: ["N14", "N11"],
  },
];


export function getNode(id: string) {
  return RoadGraph.find((n) => n.id === id);
}

export function getPosition(id: string) {
  return getNode(id)?.position;
}

export function getNeighbors(id: string) {
  return getNode(id)?.neighbors ?? [];
}

export function getRandomNeighbor(id: string) {
  const neighbors = getNeighbors(id);

  return neighbors[
    Math.floor(Math.random() * neighbors.length)
  ];
}