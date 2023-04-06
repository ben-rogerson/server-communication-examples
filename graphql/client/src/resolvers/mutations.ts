import { gql } from "@apollo/client";

export const ADD_FLORA = gql`
  mutation ($title: String!, $uses: String!) {
    addFlora(title: $title, uses: $uses) {
      id
    }
  }
`;

export const EDIT_FLORA = gql`
  mutation ($id: ID!, $title: String!, $uses: String!) {
    editFlora(id: $id, title: $title, uses: $uses) {
      id
      title
      uses
    }
  }
`;

export const DELETE_FLORA = gql`
  mutation ($id: ID!) {
    deleteFlora(id: $id) {
      id
      title
      uses
    }
  }
`;
