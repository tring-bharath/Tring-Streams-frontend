import { gql } from "@apollo/client";

export const loginSchema = gql`
  mutation guest($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
export const logoutSchema=gql`
mutation user{
logout
}
`
export const registerSchema = gql`
  mutation guest(
    $email: String = ""
    $password: String = ""
    $firstName: String = ""
    $lastName: String = ""
  ) {
    register(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
    )
  }
`;
