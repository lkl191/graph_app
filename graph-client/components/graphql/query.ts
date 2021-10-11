import { gql } from "@apollo/client";

export const ALL_GRAPHS = gql`
  query allGraphs {
    allGraphs {
      id
      title
      category
      graphKind
      description
      user {
        username
        email
      }
      data {
        id
        label
        value
      }
    }
  }
`;

export const ALL_USERS = gql`
  query allUsers {
    allUsers {
      id
      username
    }
  }
`;
export const SINGLE_GRAPH = gql`
  query singleGraph($id: ID!) {
    singleGraph(graphId: $id) {
      id
      title
      category
      graphKind
      source
      color
      description
      user {
        _id
        username
        email
      }
      data {
        id
        label
        value
      }
    }
  }
`;

export const SINGLE_BLEND_GRAPH = gql`
  query singleBlendGraph($id: ID!) {
    singleBlendGraph(id: $id) {
      id
      title
      userId
      graphs {
        title
        graphKind
        source
        color
        user {
          username
          email
        }
        data {
          label
          value
        }
      }
    }
  }
`;

export const MY_BLEND_GRAPH = gql`
  query myBlendGraphs($userId: String) {
    myBlendGraphs(userId: $userId) {
      id
      title
    }
  }
`

export const MY_GRAPHS = gql`
  query myGraphs($userId: String) {
    myGraphs(userId: $userId) {
      id
      title
      category
      graphKind
      description
      user {
        username
        email
      }
      data {
        id
        label
        value
      }
    }
  }
`;

export const SEARCH_GRAPHS = gql`
  query searchGraphs($searchWord: String) {
    searchGraphs(searchWord: $searchWord) {
      id
      title
      category
      graphKind
      description
      user {
        username
        email
      }
      data {
        id
        label
        value
      }
    }
  }
`

export const GRAPH_CATEGORY = gql`
  query graphCate($category: String) {
    graphCate(category: $category) {
      id
      title
      category
      graphKind
      description
      user {
        username
        email
      }
      data {
        id
        label
        value
      }
    }
  }
`;

export const ALL_BLEND_GRAPH = gql`
  query allBlendGraphs {
    allBlendGraphs {
      id
      graphId
      title
    }
  }
`;
