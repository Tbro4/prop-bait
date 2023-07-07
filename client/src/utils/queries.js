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
      hasMeasurement {
        length
        pieces
        power
        depth
        action
        lineWeight
        retrievalHand
        handleType
        gearRatio
        bearings
        weight
        lineRetrieve
        maxDrag
        reelSize
        diameter
        reelWeight
        lineCapacity
        spoolSize
      }
      options {
        _id
        image
        color
        test
        diameter
        size
        weight
        length
        type
      }
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

export const QUERY_USER_CART = gql`
  query UserCart($userId: ID!) {
    userCart(userId: $userId) {
      _id
      option {
        _id
        image
        color
        test
        diameter
        size
        weight
        length
        type
      }
      quantity
      product {
        _id
        name
        price
        image
      }
    }
  }
`;
