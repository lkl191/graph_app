import { gql } from "apollo-server";

module.exports = gql`
  type BlendGraph @key(fields: "graphId") {
    id: ID!
    graphId: [String]
    title: String
    userId: String
  }

  input InputBlendGraph {
    graphId: [String]
    title: String
  }

  input InputDeleteBlendGraph {
    id: ID!
  }

  type Mutation {
    createBlendGraph(inputBlendGraph: InputBlendGraph): BlendGraph
    deleteBlendGraph(inputDeleteBlendGraph: InputDeleteBlendGraph): String
  }

  type Query {
    allBlendGraphs: [BlendGraph]
    singleBlendGraph(id: ID!): BlendGraph
    myBlendGraphs(userId: String): [BlendGraph]
    searchBlendGraphs(searchWord: String): [BlendGraph]
  }
`;
