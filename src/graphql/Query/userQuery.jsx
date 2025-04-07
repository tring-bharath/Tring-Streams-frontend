import { gql } from "@apollo/client"

export const getUser=gql`
query user {
getUserData {
  email
  firstName
  id
}
}
`
export const getUserDetails=gql`
query user {
getUserData {
  email
  firstName
  lastName
  bio
  id
  dateOfBirth
  gender
  phoneNumber
  location
  profilePicture
}
}
`