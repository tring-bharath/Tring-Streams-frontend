import React, { useEffect, useState } from "react";
import "./videopreview.css";
import { useLocation, useNavigate } from "react-router-dom";
import VideoCard from "../VideoCard/VideoCard";
import axios from "axios";
import ReactPlayer from "react-player";
import { gql, useMutation, useQuery } from "@apollo/client";
const api_url = import.meta.env.VITE_API_URL;

const Videopreview = () => {
  const [videoUrl,setVideoUrl]=useState();
  const location = useLocation();
  const video = location.state;
  const id=video.id;
  const query = gql`
  query user($id: Int = 10) {
  allVideoById(id: $id) {
    id
    likes
    thumbnail
    videoUrl
    tags
    views
  }
}`
const historyMutation=gql`
mutation user($videoId: Int = 111179, $userId: Int = 1) {
  createUserHistory(
    input: {userHistory: {allVideosId: $videoId, userId: $userId}}
  )
 {
    clientMutationId
  }
}
`
  const [createHistory,{loadingHistory,errorHistory}]=useMutation(historyMutation);
  const {loading, error,data}=useQuery(query,{
    variables:{id},
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    },
  });

  useEffect(()=>
  {
    setVideoUrl(data?.allVideoById?.videoUrl);
  },[data])

  if(errorHistory)
  {
    console.log(errorHistory);
  }
  let userId = JSON.parse(localStorage.getItem("id"));
  axios.put(`${api_url}/video/updateViews/${video.id}`);
  const newVideo = { ...video, userId: userId };
  axios.post(`${api_url}/video/insertHistory`, newVideo);
  const url = `${api_url}/video/search?tag=${video.tags?.split(",")[0]}`;
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const apicall = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
      });
  };
  const navToHome = () => {
    navigate("/");
  };
  useEffect(() => {
    apicall();
    console.table({videoId:id,userId});
    
    createHistory({
      variables: { videoId:id,userId},
      context:
          {
            headers:
            {
              Authorization:`Bearer ${localStorage.getItem("token")}`
            }
          }
    });
    if(errorHistory)
      {
        console.log("errroe");
      }
  }, []);

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
      <h1 className=" ms-4 mt-2"> {location.state.tags}</h1>
      <div className="navigate d-flex justify-content-between">
        <h2 className="p-4 ps-5 ms-2 ">More like this ...</h2>
        <button className="m-4 px-3 rounded-2 h6" onClick={() => navToHome()}>
          Back to home
        </button>
      </div>
      <div className="d-flex flex-wrap video-cards align-items-center align-self-center justify-content-start ps-3">
        {videos?.map((video) => (
          <VideoCard video={video} />
        ))}
      </div>
    </div>
  );
};

export default Videopreview;
