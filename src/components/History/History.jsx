import React, { useContext, useEffect, useState } from "react";
import HistoryCard from "../HistoryCard";
import {  useQuery } from "@apollo/client";
import { getHistories } from "../../graphql/Query/videoQuery";
import { globalData } from "../../routes/AppRoutes";
import { getUser } from "../../graphql/Query/userQuery";
import "./History.css";

const History = () => {
  const url = import.meta.env.VITE_API_URL;
  const [videos, setVideos] = useState([]);
  const { data: handleGetUserData } = useQuery(getUser, {
    fetchPolicy: "no-cache",
  });
  const { userData, setUserData } = useContext(globalData);

  useEffect(() => {
    if (handleGetUserData && handleGetUserData.getUserData) {
      setUserData(handleGetUserData.getUserData);
    }
  }, [handleGetUserData]);

  const { loading, error, data, refetch } = useQuery(getHistories, {
    variables: { userId: userData?.id },
    skip: !userData,
  });

  useEffect(() => {
    setVideos(data?.allUserHistories?.nodes);
  }, [data]);

  useEffect(() => {
    refetch({
      variables: { userId: userData?.id },
    });
  }, []);
  return (
    <div className="history-container">
      {videos?.length > 0 && <h1 className="ms-3">History</h1>}
      <div className="px-3 mt-1 history-cards">
        {videos?.map((video) => (
          <HistoryCard video={video} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default History;
