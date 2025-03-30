import React, { useContext, useEffect, useState } from "react";
import HistoryCard from "../../../components/HistoryCard";
import axios from "axios";
import "./History.css";
import { gql, useQuery } from "@apollo/client";
import { getHistories, getUser } from "../../../graphql/query";
import { globalData } from "../Home";


const History = () => {
  const url = import.meta.env.VITE_API_URL;
  const [videos, setVideos] = useState([]);
  const {data:handleGetUserData}=useQuery(getUser,{fetchPolicy:"no-cache"})
  const {userData,setUserData}=useContext(globalData);

  useEffect(() => {
    if (handleGetUserData && handleGetUserData.getUserData) {
      setUserData(handleGetUserData.getUserData);
    }
  }, [handleGetUserData]);
  
  const { loading, error, data } = useQuery(getHistories, {
    variables: { userId: userData?.id },
    skip: !userData,
  });

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
