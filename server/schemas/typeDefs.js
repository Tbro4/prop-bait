const { gql } = require("graphql-tag");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    cart: [CartItem!]!
  }

  type CartItem {
    _id: ID!
    option: Option!
    quantity: Int!
  }

  input CartOptionInput {
    option: ID!
    quantity: Int!
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
    hasMeasurement: HasMeasurement
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

  type HasMeasurement {
    length: String
    pieces: String
    power: String
    depth: String
    action: String
    lineWeight: String
    retrievalHand: String
    handleType: String
    gearRatio: String
    bearings: String
    weight: String
    lineRetrieve: String
    maxDrag: String
    reelSize: String
    diameter: String
    reelWeight: String
    lineCapacity: String
    spoolSize: String
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
    addToCart(userId: ID!, options: [CartOptionInput!]!): [CartItem!]!
  }
`;

module.exports = typeDefs;
