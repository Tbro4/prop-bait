import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation addToCart($userId: ID!, $options: [CartOptionInput!]!) {
    addToCart(userId: $userId, options: $options) {
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
    }
  }
`;

export const UPDATE_CART_ITEM_QUANTITY = gql`
  mutation updateCartItemQuantity(
    $userId: ID!
    $cartItemId: ID!
    $quantity: Int!
  ) {
    updateCartItemQuantity(
      userId: $userId
      cartItemId: $cartItemId
      quantity: $quantity
    ) {
      _id
      quantity
      # Include any other fields you need in the response
    }
  }
`;
