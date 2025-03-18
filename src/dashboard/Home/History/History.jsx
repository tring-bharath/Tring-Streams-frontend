import React, { useEffect, useState } from "react";
import HistoryCard from "../../../components/HistoryCard";
import axios from "axios";
import "./History.css";

const History = () => {
  const url = import.meta.env.VITE_API_URL;
  const [videos, setVideos] = useState([]);
  const userId = JSON.parse(localStorage.getItem("id"));

  const showCards = async () => {
    try {
      const res = await axios.get(`${url}/video/history/${userId}`);
      setVideos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    showCards();
  }, []);

  return (
    <div className="history-container">
      {videos.length != 0 && <h1 className="ms-3">History</h1>}
      <div className="px-3 mt-1 history-cards">
        {videos?.map((video) => (
          <HistoryCard video={video} showCards={showCards} />
        ))}
      </div>
    </div>
  );
};

export default History;
