import React, { useState } from "react";
import axios from "axios";
import { FaBookmark, FaEye, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Image, Modal } from "react-bootstrap";
import "./VideoCard.css";

const VideoCard = ({ video }) => {
  const nav = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const [show, setShow] = useState(false);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const user = localStorage.getItem("user");

  const watchNow = async () => {
    if (user) {
      nav("/videoplayer", { state: video });
      window.scrollTo(0, 0);
    } else {
      setShow(true);
    }
  };

  const watchList = async (video) => {
    setIsBookMarked(true);
    const userId = JSON.parse(localStorage.getItem("id"));
    const newVideo = { ...video, userId: userId };
    await axios
      .post(`${url}/video/insert`, newVideo)
      .then((res) => toast.success("Video added to Watch List"))
      .catch((err) => toast.error("Already in the watchList"));
  };

  const setLogin = () => {
    nav("/registration");
  };

  return (
    <div className="video-card rounded-1 pb-2">
      <Image
        onClick={() => watchNow()}
        src={video.thumbnail}
        alt="video thumbnail"
        className="thumbnail cards"
        rounded
      />
      <div className="video-info d-flex flex-column">
        <h4 className="ellipsis px-2 video-title">{video.tags}</h4>
        <div className="video-stats px-2 d-flex align-items-center">
          {/* <span className="likes pe-3 ">
            <FaHeart className="text-danger" /> {video.likes}
          </span> */}
          <span className="views">
            <FaEye className="text-primary" /> {video.views}
          </span>
          <div className="overlay-buttons d-flex px-2 my-1">
            {user != null ? (
              <button
                className="add-watchlist button rounded px-2 py-1"
                onClick={() => watchList(video)}>
                {!isBookMarked ? <FaRegBookmark /> : <FaBookmark />}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton><h3>Login!</h3></Modal.Header>
        <Modal.Body><h5>You are not Logged in</h5></Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setLogin()}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VideoCard;
