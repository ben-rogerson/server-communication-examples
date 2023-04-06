import { gql } from "@apollo/client";

export const GET_ALL_FLORA = gql`
  query {
    getAllFlora {
      id
      title
    }
  }
`;

export const GET_FLORA = gql`
  query ($id: ID!) {
    getFlora(id: $id) {
      id
      title
      uses
    }
  }
`;
