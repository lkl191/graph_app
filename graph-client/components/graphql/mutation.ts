import { gql } from "@apollo/client";

export const CREATE_BLEND_GRAPH = gql`
  mutation createBlendGraph($title: String, $graphId: [String]) {
    createBlendGraph(inputBlendGraph: { title: $title, graphId: $graphId }) {
      id
      title
      graphId
    }
  }
`;

//enum型はそのままでok
export const CREATE_GRAPH = gql`
  mutation createGraph(
    $title: String!
    $graphKind: GraphKind!
    $category: String!
    $source: String
    $label: [String]
    $value: [Float]
    $color: String
    $description: String
  ) {
    createGraph(
      inputGraph: {
        title: $title
        graphKind: $graphKind
        category: $category
        source: $source
        label: $label
        value: $value
        color: $color
        description: $description
      }
    ) {
      id
      title
      graphKind
      category
      source
    }
  }
`;

export const CREATE_GRAPH_DATA = gql`
  mutation createData($graphId: String!, $label: [String], $value: [Int]) {
    createData(inputData: { graphId: $graphId, label: $label, value: $value }) {
      id
      graphId
      data {
        label
        value
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($props: String) {
    Login(props: $props) {
      _id
      email
    }
  }
`;

export const SIGNIN = gql`
  mutation SignIn($email: String!) {
    SignIn(inputUser: { email: $email }) {
      email
    }
  }
`;

export const DELETE_GRAPH = gql`
  mutation deleteGraph($id: ID!) {
    deleteGraph(inputDeleteGraph: { id: $id })
  }
`;

export const DELETE_BLEND_GRAPH = gql`
  mutation deleteBlendGraph($id: ID!) {
    deleteBlendGraph(inputDeleteBlendGraph: { id: $id })
  }
`;
