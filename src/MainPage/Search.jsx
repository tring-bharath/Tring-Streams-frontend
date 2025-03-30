import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import VideoCard from "../components/VideoCard/VideoCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { gql, useQuery } from "@apollo/client";
import { searchSchema } from "../graphql/query";


const Search = () => {
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState([]);

  const { loading, error, data, refetch } = useQuery(searchSchema, {
    variables: { tag: "" }
  });

  useEffect(() => {
    refetch({ tag: search }); // Refetch when search changes
  }, [search]);

  useEffect(() => {
    if (data && data.allAllVideos) {
      setVideos(data.allAllVideos.nodes);
    }
  }, [data]);
  return (
    <div className=" d-flex flex-column align-items-center w-100">
      <ToastContainer />
      <div className="search d-flex justify-content-center w-100">
        <FaSearch className="search-icon align-self-center" size={30} />
        <input
          type="text"
          className="search-box w-75 h3 px-2 py-2 m-3 "
          placeholder="Type to Search"
          onChange={(e) => setSearch(e.target.value.trim(" "))}
        />
      </div>
      <div className="d-flex flex-wrap video-cards w-100 ps-3 mb-3">
        {videos?.map((video) => (
          <VideoCard video={video} />
        ))}
      </div>
    </div>
  );
};

export default Search;
