import React, { useEffect, useState } from "react";
import HistoryCard from "../../../components/HistoryCard";
import axios from "axios";
import "./History.css";
import { gql, useQuery } from "@apollo/client";

const getHistories=gql`
query MyQuery($userId: Int!) {
  allUserHistories(condition: {userId: $userId}) {
    nodes {
      allVideoByAllVideosId {
        id
        likes
        thumbnail
        views
        tags
      }
    }
  }
}
`
const History = () => {
  const url = import.meta.env.VITE_API_URL;
  const [videos, setVideos] = useState([]);
  const userId = JSON.parse(localStorage.getItem("id"));


  const {loading,error,data}=useQuery(getHistories,{
    variables:{userId}
  });


  const user = (localStorage.getItem("token"));

  useEffect(() => {
    setVideos(data?.allUserHistories?.nodes);
  }, [data]);


  return (
    <div className="history-container">
      {videos?.length != 0 && <h1 className="ms-3">History</h1>}
      <div className="px-3 mt-1 history-cards">
        {videos?.map((video) => (
          <HistoryCard video={video} />
        ))}
      </div>
    </div>
  );
};

export default History;
