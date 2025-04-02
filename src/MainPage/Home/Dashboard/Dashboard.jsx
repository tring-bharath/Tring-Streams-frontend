import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import VideoCard from "../../../components/VideoCard/VideoCard";
import { gql, useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import History from "../History/History";
import { ToastContainer } from "react-toastify";
import "./Dashboard.css";
import { globalData } from "../../../routes/AppRoutes";
import { getCarousel, getUser, getVideos } from "../../../graphql/query";
import FullPageLoader from "../../../components/VideoPreview/fullPageLoader/fullPageLoader";
const Dashboard = () => {
  const nav = useNavigate();
  const [videos, setVideos] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { userData, setUserData } = useContext(globalData);
  const {
    loading: userLoading,
    error: userError,
    data: handleGetUserData,
  } = useQuery(getUser, { fetchPolicy: "no-cache" });
  useEffect(() => {
    if (handleGetUserData && handleGetUserData.getUserData) {
      console.log(handleGetUserData.getUserData);

      setUserData(handleGetUserData.getUserData);
    }
  }, [handleGetUserData]);
  const {
    loading: videosLoading,
    fetchMore,
    data: videosData,
  } = useQuery(getVideos, {
    variables: { first: 10 },
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      console.log(data);
      if (data.allAllVideos.edges.length > 0) {
        setVideos(data.allAllVideos.edges.map((edge) => edge.node));
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const {
    loading: carouselLoading,
    error: carouselError,
    data: carouselData,
  } = useQuery(getCarousel, { fetchPolicy: "no-cache" });
  useEffect(() => {
    if (videosData && videosData.allAllVideos) {
      setVideos(videosData.allAllVideos.nodes);
    }
  }, [videosData]);
  useEffect(() => {
    if (carouselData && carouselData.allAllVideos) {
      setCarousel(carouselData.allAllVideos.nodes);
    }
  }, [carouselData]);
  if (videosLoading || carouselLoading || userLoading) {
    return <FullPageLoader />;
  }
  const loadMoreVideos = () => {
    console.log("Current Videos:", videos);
    console.log("Current PageInfo:", videosData?.allAllVideos?.pageInfo);
  
    if (!videosData?.allAllVideos?.pageInfo?.hasNextPage) {
      console.log("No more videos to load.");
      setHasMore(false);
      return;
    }
  
    fetchMore({
      variables: {
        first: 10,
        after: videosData.allAllVideos.pageInfo.endCursor, // End cursor from the last response
      },
      updateQuery: ({ fetchMoreResult }) => {
        setVideos(...fetchMoreResult.allAllVideos.edges);
      },
    });
  };
  
  return (
    <div className="carousel-container">
      <ToastContainer />
      <Carousel wrap interval={2000} className="mb-3" fade={false} keyboard>
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
        dataLength={videos?.length!=null ||videos?.length|| 40}
        next={loadMoreVideos}
        hasMore={hasMore}
        loader={<h4 className="p-5">Loading Videos...</h4>}
        className="infinite-scroll">
        <h1 className="ms-3">All Videos</h1>
        <div className="d-flex flex-wrap video-cards justify-content-center">
          {videos?.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Dashboard;
