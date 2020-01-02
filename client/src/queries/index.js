import { gql } from "apollo-boost";

export const GET_AUTHORS = gql`
  {
    authors {
      name
      age
      id
    }
  }
`;

export const GET_BOOKS = gql`
  {
    books {
      id
      name
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      name
      id
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;
