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
    image: String
    options: [Option]
  }

  type Option {
    _id: ID
    image: String
    color: String
    test: String
    diameter: String
    size: String
    weight: String
    length: String
    type: String
  }

  type ProductSubCategory {
    _id: ID
    category: String
    subCategory: String
    image: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    productsBySubCategory(subCategory: String!): [Product]!

    productsByCategory(category: String!): [Product]!

    subCategoryByCategory(category: String!): [ProductSubCategory]!

    productById(productId: ID!): Product

    productsByKeyword(keyword: String!): [Product]!

    users: [User]
    user(username: String!): User
    products: [Product]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
