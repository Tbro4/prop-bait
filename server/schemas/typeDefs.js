const { gql } = require("graphql-tag");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Product {
    _id: ID
    name: String
    price: String
    description: String
    brand: String
    category: String
    subCategory: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    products: [Product]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }

  type Product {
    _id: ID
    name: String!
    description: String!
    brand: String!
    image: String!
  }
`;

module.exports = typeDefs;
