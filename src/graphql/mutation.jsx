import { gql } from "@apollo/client";

export const loginSchema = gql`
  mutation guest($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
export const logoutSchema = gql`
  mutation user {
    logout
  }
`;
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
export const updateUserSchema = gql`
  mutation user(
    $dateOfBirth: Datetime = ""
    $firstName: String = ""
    $gender: UserGenderEnum = MALE
    $lastName: String = ""
    $location: String = ""
    $phoneNumber: String = ""
    $profilePicture: String = ""
    $bio:String=""
    $id: Int!
  ) {
    updateUserById(
      input: {
        userPatch: {
          dateOfBirth: $dateOfBirth
          firstName: $firstName
          gender: $gender
          lastName: $lastName
          location: $location
          phoneNumber: $phoneNumber
          profilePicture: $profilePicture
          bio:$bio  
        }
        id: $id
      }
    ) {
      clientMutationId
    }
  }
`;

 export const historyMutation = gql`
    mutation user($videoId: Int!, $userId: Int!) {
      createUserHistory(
        input: { userHistory: { allVideosId: $videoId, userId: $userId } }
      ) {
        clientMutationId
      }
    }
  `;