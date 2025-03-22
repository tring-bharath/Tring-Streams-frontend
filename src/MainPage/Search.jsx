import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import VideoCard from "../components/VideoCard/VideoCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery, gql } from "@apollo/client";
const Search = () => {
  const url = import.meta.env.VITE_API_URL;
  const [search, setSearch] = useState();
  const [videos, setVideos] = useState([]);

  const getUsers = gql`
    query {
      allUserDetails {
        nodes {
          firstName
          lastName
          nodeId
          email
          password
        }
      }
    }
  `;

  const {loading,error,data}=useQuery(getUsers);

  if(loading)
  {
    return(
      <div>
        <h1>Loading</h1>
      </div>
    )
  }
  if(error)
  {
    return(
      <>
      <h1>Error</h1>
      </>
    )
  }
  console.log(error?error:data);
  
  const handleGetAllVideos = () => {
    fetch(`${url}/video/search?tag=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
      });
  };

  useEffect(() => {
    handleGetAllVideos();
  }, [search]);
  if(data)
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
