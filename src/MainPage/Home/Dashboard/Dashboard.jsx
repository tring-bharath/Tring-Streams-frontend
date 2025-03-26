import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import VideoCard from "../../../components/VideoCard/VideoCard";
import { gql, useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import History from "../History/History";
import { ToastContainer } from "react-toastify";
import "./Dashboard.css";

const GET_VIDEOS = gql
`
  query guest {
    allAllVideos {
      nodes {
        id
        tags
        likes
        thumbnail
        views
      }
    }
  }
`
;

const Dashboard = () => {
  const nav = useNavigate();
  const [videos, setVideos] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { loading, error, data } = useQuery(GET_VIDEOS, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    },
  });

  useEffect(() => {
    console.log(JSON.stringify(`Bearer ${localStorage.getItem("token")}`));
    
    if (data && data.allAllVideos) {
      setVideos(data.allAllVideos.nodes);
    }
  }, [data]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error fetching videos!</h1>;

  return (
    <div className="carousel-container">
      <ToastContainer />
      <Carousel wrap interval={2000} className="mb-3" fade keyboard>
        {carousel?.map((video) => (
          <Carousel.Item key={video.id}>
            <img src={video.thumbnail} alt="Banner" className="banner-image" />
            <Carousel.Caption className="banner">
              <h1 className="banner-title align-self-start">{video.tags}</h1>
              <button
                className="px-3 py-2 rounded-1 me-3 mt-3 carousel-btn"
                onClick={() => nav("/videoplayer", { state: video })}>
                Watch Now
              </button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <History />
      <InfiniteScroll
        dataLength={videos.length}
        hasMore={hasMore}
        loader={<h4 className="p-5">Loading Videos...</h4>}
        className="infinite-scroll">
        <h1 className="ms-3">All Videos</h1>
        <div className="d-flex flex-wrap video-cards justify-content-center">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Dashboard;
