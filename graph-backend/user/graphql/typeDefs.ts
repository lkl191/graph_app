import { gql } from "apollo-server";

module.exports = gql`
  type User @key(fields: "_id") {
    _id: String
    email: String!
    username: String
    password: String
  }
  input InputUser {
    email: String!
  }
  type Mutation {
    SignIn(inputUser: InputUser): User
    Login(props: String): User
  }
  extend type Query {
    allUsers: [User]
  }
  extend type Graph @key(fields: "userId") {
    userId: String @external
    user: User
  }
`;
