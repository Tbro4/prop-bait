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
