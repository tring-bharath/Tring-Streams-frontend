import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import VideoCard from "../../../components/VideoCard/VideoCard";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import History from "../History/History";
import { ToastContainer } from "react-toastify";
import "./Dashboard.css";

const Dashboard = () => {
  const nav = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [videos, setVideos] = useState([]);
  const [carousel, setCarousel] = useState([]);

  const handleGetAllVideos = async () => {
    try {
      const res = await axios.get(`${url}/video/getAllVideos?page=${page}`);
      const carouselData = await axios.get(`${url}/video/carousel`);
      const data = res.data;

      setCarousel(carouselData.data);
      if (data.length < 20) setHasMore(false);

      setVideos((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setHasMore(false);
    }
  };

  const watchNow = (video) => {
    nav("/videoplayer", { state: video });
  };

  useEffect(() => {
    handleGetAllVideos();
  }, []);

  return (
    <div className="carousel-container">
      <ToastContainer />
      <Carousel wrap={true} interval={2000} className="mb-3">
        {carousel?.map((video) => (
          <Carousel.Item>
            <img src={video?.thumbnail} alt="Banner" className="banner-image" />
            <Carousel.Caption className="banner">
              <h1 className="banner-title align-self-start">{video.tags}</h1>
              <div className="banner-footer d-flex align-items-center">
                <button
                  className="px-3 py-2 rounded-1 me-3 mt-3 carousel-btn "
                  onClick={() => watchNow(video)}>
                  Watch Now
                </button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <History />
      <InfiniteScroll
        dataLength={videos.length}
        next={handleGetAllVideos}
        hasMore={hasMore}
        loader={<h4>Loading Videos</h4>}
        className="infinite-scroll">
        <h1 className="ms-3">All Videos</h1>
        <div className="d-flex flex-wrap video-cards justify-content-center">
          {videos.map((video) => (
            <VideoCard video={video} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Dashboard;
