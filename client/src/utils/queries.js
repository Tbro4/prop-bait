import { gql } from "@apollo/client";

export const QUERY_PRODUCTS_BY_SUBCATEGORY = gql`
  query ProductsBySubCategory($subCategory: String!) {
    productsBySubCategory(subCategory: $subCategory) {
      _id
      brand
      category
      subCategory
      name
      price
      image
    }
  }
`;
export const QUERY_ALL_PRODUCTS = gql`
  query Query {
    products {
      _id
      name
      price
      description
      brand
      category
      subCategory
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;
