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
export const QUERY_PRODUCTS_BY_CATEGORY = gql`
  query ProductsByCategory($category: String!) {
    productsByCategory(category: $category) {
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
export const QUERY_PRODUCT_BY_ID = gql`
  query ProductById($productId: ID!) {
    productById(productId: $productId) {
      _id
      brand
      category
      subCategory
      name
      price
      image
      description
    }
  }
`;

export const QUERY_SUBCATEGORIES_BY_CATEGORY = gql`
  query SubCategoryByCategory($category: String!) {
    subCategoryByCategory(category: $category) {
      _id
      category
      subCategory
      image
    }
  }
`;
export const QUERY_PRODUCTS_BY_KEYWORD = gql`
  query ProductsByKeyword($keyword: String!) {
    productsByKeyword(keyword: $keyword) {
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

export const QUERY_SEARCH_OPTIONS = gql`
  query SearchOptions($keyword: String!) {
    searchOptions(keyword: $keyword) {
      brand
      category
      subCategory
      name
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
