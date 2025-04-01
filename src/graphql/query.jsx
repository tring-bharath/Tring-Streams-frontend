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
  id
  dateOfBirth
  gender
  phoneNumber
  location
  profilePicture
}
}
`
export const searchSchema=gql`
query guest($tag: String = "") {
  allAllVideos(filter: {tags: {includesInsensitive: $tag}}) {
    nodes {
      id
      likes
      tags
      thumbnail
      videoUrl
      views
    }
  }
}
`
export const getHistories=gql`
query user($userId: Int!) {
  allUserHistories(condition: {userId: $userId}) {
    nodes {
      allVideoByAllVideosId {
        id
        likes
        thumbnail
        views
        tags
      }
    }
  }
}
`
export const getWatchList=gql`
query user($userId: Int!) {
allUserWatchlists(condition: {userId: $userId}) {
  nodes {
    allVideoByAllVideosId {
      id
      likes
      tags
      thumbnail
      views
    }
  }
}
}
`
export const getVideos = gql
`
  query guest {
    allAllVideos {
      nodes {
        id
        tags
        likes
        thumbnail
        views
      }
    }
  }
`
;
export const getCarousel=gql
`
query guest {
  allAllVideos(orderBy: VIEWS_DESC, first: 5) {
    nodes {
      id
      likes
      tags
      thumbnail
      videoUrl
      views
    }
  }
}
`