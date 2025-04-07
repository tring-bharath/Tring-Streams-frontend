import {  useMutation } from "@apollo/client";
import { useContext } from "react";
import { FaEye, FaHeart, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { globalData } from "../routes/AppRoutes";
import { deleteCard } from "../graphql/Mutation/videoMutation";

const HistoryCard = ({ video,refetch }) => {
  const nav = useNavigate();
  const {userData}=useContext(globalData);
  video=video.allVideoByAllVideosId;
  const [removeFromHistory]=useMutation(deleteCard)
  const remove = async (video) => {
    const res=await removeFromHistory(
      {
        variables:{videoId:video.id,userId:userData.id}
      }
    )
    refetch(
      {
        variables:{userId:userData.id}
      }
    )
    console.log(res);
  };

  const watchNow = () => {
    nav("/videoplayer", { state: video });
  };



  return (
    <div
      className="video-card mx-2 mt-3 rounded-2">
      <img
        src={video.thumbnail}
        alt="video thumbnail"
        className="thumbnail rounded-3"
        onClick={() => watchNow()}
      />
      <div className="video-info px-2">
        <h5 className="tag mt-1" style={{ textTransform: "capitalize" }}>
          {video.tags?.split(",")[0]}
        </h5>
        <div className="video-stats mb-2 d-flex align-items-center">
          {/* <span className="fw-semibold me-2">
            <FaHeart size={12} className="text-danger" /> {video.likes}
          </span> */}
          <span className="fw-semibold me-3">
            <FaEye size={13} className="text-primary" /> {video.views}
          </span>
          <button
            className="add-watchlist btn bg-danger text-white fw-semibold"
            onClick={() => remove(video)}>
            <FaTrash className="text-white align-self-center" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
