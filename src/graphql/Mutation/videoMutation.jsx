import { gql } from "@apollo/client";


export const historyMutation = gql`
  mutation user($videoId: Int!, $userId: Int!) {
    createUserHistory(
      input: { userHistory: { allVideosId: $videoId, userId: $userId } }
    ) {
      clientMutationId
    }
  }
`;
export const watchListMutation = gql`
  mutation user($videoId: Int!, $userId: Int!) {
    createUserWatchlist(
      input: { userWatchlist: { allVideosId: $videoId, userId: $userId } }
    ) {
      clientMutationId
    }
  }
`;

export const updateViews = gql`
  mutation user($videoId: Int!) {
    updateViews(videoId: $videoId)
  }
`;
export const deleteCard=gql`
mutation user($videoId: Int = 10, $userId: Int = 10) {
  deleteUserHistoryByAllVideosIdAndUserId(
    input: {allVideosId: $videoId, userId: $userId}
  ) {
    clientMutationId
    deletedUserHistoryId
  }
}
`
export const deleteWatchListCard = gql`
  mutation user($videoId: Int = 10, $userId: Int = 10) {
    deleteUserWatchlistByAllVideosIdAndUserId(
      input: { allVideosId: $videoId, userId: $userId }
    ) {
      clientMutationId
      deletedUserWatchlistId
    }
  }
`;
