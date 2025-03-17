import axios from "axios";
import { useState } from "react";
import { FaEye, FaHeart, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HistoryCard = ({ video, showCards }) => {
  const url = import.meta.env.VITE_API_URL;
  const nav = useNavigate();
  const [hover, setHover] = useState(false);

  const remove = async (video) => {
    await axios.delete(`${url}/video/removeFromHistory/${video._id}`);
    showCards();
  };

  const watchNow = () => {
    nav("/videoplayer", { state: video });
  };
  return (
    <div
      className="video-card mx-2 mt-3 rounded-2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
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
            <FaHeart size={12} className="text-danger" /> {video.likes}{" "}
          </span> */}
          <span className="fw-semibold me-3">
            <FaEye size={13} className="" /> {video.views}
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
