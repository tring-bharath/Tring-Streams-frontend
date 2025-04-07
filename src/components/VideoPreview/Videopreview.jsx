import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { useMutation, useQuery } from "@apollo/client";
import { globalData } from "../../routes/AppRoutes";
import {  getUser } from "../../graphql/Query/userQuery";
import { historyMutation, updateViews } from "../../graphql/Mutation/videoMutation";
import { getAllVideos } from "../../graphql/Query/videoQuery";
import "./videopreview.css";

const Videopreview = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const location = useLocation();
  const video = location.state;
  const id = video.id;

  const { userData, setUserData } = useContext(globalData);
  const [handleUpdateViews] = useMutation(updateViews);

  const { data: handleGetUserData } = useQuery(getUser, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (handleGetUserData?.getUserData) {
      console.log(handleGetUserData.getUserData);
      setUserData(handleGetUserData.getUserData);
    }
  }, [handleGetUserData]);

  const [createHistory] = useMutation(historyMutation);

  const { data } = useQuery(getAllVideos, { variables: { id } });

  const navToHome = () => {
    window.history.back();
  };

  useEffect(() => {
    if (data?.allVideoById?.videoUrl) {
      setVideoUrl(data.allVideoById.videoUrl);
    }
  }, [data]);
  useEffect(() => {
    handleUpdateViews({
      variables: {
        videoId: video.id,
      },
    });
  }, []);
  useEffect(() => {
    if (userData?.id) {
      console.table(id, userData.id);
      createHistory({ variables: { videoId: id, userId: userData.id } })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
  }, [userData]);

  return (
    <div>
      <ReactPlayer
        url={videoUrl}
        controls
        playing={true}
        pip={true}
        className="video-panel"
        height={"80vh"}
        width={"100%"}
        poster={location.state.thumbnail}
      />
      <h1 className="ms-4 mt-2">{location.state.tags}</h1>
      <div className="navigate d-flex justify-content-between">
        <h2 className="p-4 ps-5 ms-2"></h2>
        <button className="m-4 px-3 rounded-2 h6 py-3" onClick={navToHome}>
          Back to home
        </button>
      </div>
    </div>
  );
};

export default Videopreview;
