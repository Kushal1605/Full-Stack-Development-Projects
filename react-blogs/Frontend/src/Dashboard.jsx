import { useEffect } from "react";
import authService from "./services/authService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      const response = await authService.getCurrentUser();
      if (!response.user) {
        navigate("/login")
      }
    })();
  }, [navigate]);


  return <div>Dashboard</div>;
};

export default Dashboard;
