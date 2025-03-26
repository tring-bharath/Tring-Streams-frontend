import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye, FaHeart, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import WatchListCard from "../components/WatchListCard";
import { gql, useQuery } from "@apollo/client";

  const getWatchList=gql`
  query MyQuery($userId: Int!) {
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

const Watchlist = () => {
  const url = import.meta.env.VITE_API_URL;
  const [videos, setVideos] = useState([]);
  const userId = JSON.parse(localStorage.getItem("id"));
  const navigate = useNavigate();

  const loginNavigate = () => {
    navigate("/registration");
  };

  const {loading,error,data}=useQuery(getWatchList,{
    variables:{userId}
  });


  const user = (localStorage.getItem("token"));

  useEffect(() => {
    setVideos(data?.allUserWatchlists?.nodes);
  }, [data]);

  return (
    <div className="container w-100">
      {user != null ? (
        <div className="userAvailable">
          <p className="h1 ms-2 mt-2">Watch List</p>
          {videos?.length != 0 ? (
            <div className="d-flex px-2 flex-wrap video-cards mt-4">
              {videos?.map((video) => (
                <WatchListCard video={video} />
              ))}
            </div>
          ) : (
            <div className="w-100 d-flex align-items-center justify-content-center">
              <h4 className="mt-5">Nothing is in the WatchList</h4>
            </div>
          )}
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
          <div className="userUnavailable h3">
            Login to save and watch videos
          </div>
          <button
            className="bg-primary text-white border-0 px-3 py-2 rounded h6"
            onClick={loginNavigate}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};


export default Watchlist;
