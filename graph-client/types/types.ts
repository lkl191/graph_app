export type GraphType = {
    title: string
    category: string
    graphKind: GraphKind
    source: string
    label: [string]
    value: [number]
    color: string
    description: string
}

export type UserType = {
    email: string,
    password: string
}

export type IdType = {
    id: string
}

export type DatasetsType = {
    type: string;
    data: any[];
    label: string;
    backgroundColor: string;
    borderColor: string;
    pointBorderColor: string;
    pointHoverBackgroundColor: string
  };

  export type IsGraphType = "NORMAL" | "BLEND"


type GraphKind = "LINE" | "BAR" | "PIE" | "RADAR"