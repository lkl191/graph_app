export type Context = {
    AuthContext: string
}

type GraphKind = "LINE" | "BAR" | "PIE" | "PADAR" | "SCATTER"

type GraphType = {
    title: string,
    category: string,
    graphKind: GraphKind,
    source: [string],
    label: [string],
    value: [string],
    color: string,
    description: string
}

export type InputGraphType = {
    inputGraph: GraphType
  }