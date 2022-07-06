import { useEffect, useState } from "react";
import { getInitData, fetchDashboardData } from "../services/gitlabService";
import { updateTitle } from "../helpers/helper";

export const useDashboardData = () => {
  const [user, setUser] = useState({});
  const [projectData, setProjectData] = useState({});
  const [mergeRequestsToCheck, setMergeRequestsToCheck] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshDashboardData = (userData, projectData) => {
    setIsLoading(true);
    fetchDashboardData(userData, projectData)
      .then((mergeRequests) => {
        setMergeRequestsToCheck(mergeRequests);
        updateTitle(mergeRequests, userData);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    let intervalId;
    setIsLoading(true);
    getInitData()
      .then(({ userData, projectData }) => {
        setUser(userData);
        setProjectData(projectData);
        refreshDashboardData(userData, projectData);
        // refresh every hour
        intervalId = setInterval(() => refreshDashboardData(userData, projectData), 3600000);
      })
      .catch(() => {
        setIsLoading(false);
      });
    return () => clearInterval(intervalId);
  }, []);

  return [user, projectData, mergeRequestsToCheck, isLoading, refreshDashboardData];
}

