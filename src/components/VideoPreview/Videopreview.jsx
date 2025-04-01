import React, { useContext, useEffect, useState } from "react";
import "./videopreview.css";
import { useLocation, useNavigate } from "react-router-dom";
import VideoCard from "../VideoCard/VideoCard";
import axios from "axios";
import ReactPlayer from "react-player";
import { gql, useMutation, useQuery } from "@apollo/client";
import { globalData } from "../../routes/AppRoutes";
import { getUser } from "../../graphql/query";

const api_url = import.meta.env.VITE_API_URL;

const Videopreview = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const location = useLocation();
  const video = location.state;
  const id = video.id;
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  const query = gql`
    query user($id: Int!) {
      allVideoById(id: $id) {
        id
        likes
        thumbnail
        videoUrl
        tags
        views
      }
    }
  `;

  const historyMutation = gql`
    mutation user($videoId: Int!, $userId: Int!) {
      createUserHistory(
        input: { userHistory: { allVideosId: $videoId, userId: $userId } }
      ) {
        clientMutationId
      }
    }
  `;

  const { userData, setUserData } = useContext(globalData);

  const {
    loading: userLoading,
    error: userError,
    data: handleGetUserData,
  } = useQuery(getUser, { fetchPolicy: "no-cache" });

  useEffect(() => {
    if (handleGetUserData?.getUserData) {
      console.log(handleGetUserData.getUserData);
      setUserData(handleGetUserData.getUserData);
    }
  }, [handleGetUserData]);

  const [createHistory, { loadingHistory, errorHistory }] =
    useMutation(historyMutation);

  const { loading, error, data } = useQuery(query, { variables: { id } });

  useEffect(() => {
    if (data?.allVideoById?.videoUrl) {
      setVideoUrl(data.allVideoById.videoUrl);
    }
  }, [data]);

  useEffect(() => {
    if (userData?.id) {
      console.table(id, userData.id);
      createHistory({ variables: { videoId: id, userId: userData.id } })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
  }, [userData]); // Only runs when userData is available

  const navToHome = () => {
    navigate("/");
  };

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
        <h2 className="p-4 ps-5 ms-2">More like this ...</h2>
        <button className="m-4 px-3 rounded-2 h6" onClick={navToHome}>
          Back to home
        </button>
      </div>
      <div className="d-flex flex-wrap video-cards align-items-center align-self-center justify-content-start ps-3">
        {videos?.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Videopreview;
