import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaHeart, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { globalData } from "../routes/AppRoutes";
import { getUser } from "../graphql/query";

const deleteCard = gql`
  mutation user($videoId: Int = 10, $userId: Int = 10) {
    deleteUserWatchlistByAllVideosIdAndUserId(
      input: { allVideosId: $videoId, userId: $userId }
    ) {
      clientMutationId
      deletedUserWatchlistId
    }
  }
`;
const WatchListCard = ({ video, refetch }) => {
  const url = import.meta.env.VITE_API_URL;
  const nav = useNavigate();
  const [hover, setHover] = useState(false);
  // const userId = JSON.parse(localStorage.getItem("id"));
  video = video.allVideoByAllVideosId;
    const {data:handleGetUserData}=useQuery(getUser,{fetchPolicy:"no-cache"})
    const {userData,setUserData}=useContext(globalData);
  
    useEffect(() => {
      if (handleGetUserData && handleGetUserData.getUserData) {
        setUserData(handleGetUserData.getUserData);
      }
    }, [handleGetUserData]);
  const [removeFromWatchList, { loading, error }] = useMutation(deleteCard);

  const remove = async (video) => {
    const res = await removeFromWatchList({
      variables: { videoId: video.id, userId:userData.id },
    });
    console.log(res);
    refetch({
      variables: {
        userId:userData.id,
      },
    });
  };

  const watchNow = (Video) => {
    nav("/videoplayer", { state: Video });
  };
  return (
    <div
      className="video-card rounded-2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <img
        src={video.thumbnail}
        alt="video thumbnail"
        className="thumbnail rounded-3"
        onClick={() => watchNow(video)}
      />
      <div className="video-info px-2">
        <h5 className="tag mt-1" style={{ textTransform: "capitalize" }}>
          {video.tags.split(",")[0]}
        </h5>
        <div className="video-stats d-flex align-items-center mb-2">
          {/* <span className="fw-semibold me-3 ">
              <FaHeart size={12} className="text-danger" /> {video.likes}{" "}
            </span> */}
          <span className="fw-semibold me-3">
            <FaEye size={13} className="" /> {video.views}
          </span>
          <button
            className="add-watchlist btn bg-danger mx-2 fw-semibold align-self-center"
            onClick={() => remove(video)}>
            <FaTrash className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default WatchListCard;
