import React, { useContext, useEffect, useState } from "react";
import { FaBookmark, FaEye, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Image, Modal } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { getUser } from "../../graphql/Query/userQuery";
import { globalData } from "../../routes/AppRoutes";
import { watchListMutation } from "../../graphql/Mutation/videoMutation";
import "react-toastify/dist/ReactToastify.css";
import "./VideoCard.css";

const VideoCard = ({ video }) => {
  const nav = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const [show, setShow] = useState(false);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const user = localStorage.getItem("token");
  const { data: handleGetUserData } = useQuery(getUser, {
    fetchPolicy: "no-cache",
  });
  const { userData, setUserData } = useContext(globalData);

  useEffect(() => {
    if (handleGetUserData && handleGetUserData.getUserData) {
      setUserData(handleGetUserData.getUserData);
    }
  }, [handleGetUserData]);

  const watchNow = async () => {
    if (userData?.id) {
      nav("/videoplayer", { state: video });
      window.scrollTo(0, 0);
    } else {
      setShow(true);
    }
  };

  const [createWatchList] = useMutation(watchListMutation, {
    onCompleted: () => {
      toast.success("Added to WatchList");
    },
    onError: () => {
      toast.error("Already in the WatchList");
    },
  });

  const watchList = async (video) => {
    setIsBookMarked(true);
    createWatchList({
      variables: { videoId: video.id, userId: userData.id },
    });
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
          <span className="views">
            <FaEye className="text-primary" /> {video.views}
          </span>
          <div className="overlay-buttons d-flex px-2 my-1">
            {userData && Object.keys(userData).length > 0 ? (
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
        <Modal.Header closeButton>
          <h3>Login!</h3>
        </Modal.Header>
        <Modal.Body>
          <h5>You are not Logged in</h5>
        </Modal.Body>
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
