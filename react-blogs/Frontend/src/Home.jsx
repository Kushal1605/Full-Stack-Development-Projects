import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Link to="/login"> Login </Link>
      <Link to="/register"> register </Link>
      <Link to="/dashboard"> Dashboard </Link>
    </>
  );
};

export default Home;
