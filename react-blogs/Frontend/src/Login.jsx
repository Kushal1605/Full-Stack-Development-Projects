import authService from "./services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handlesubmit = async (event) => {
    event.preventDefault();

    const response = await authService.loginUser({
      username: event.target.username.value,
      password: event.target.password.value,
    });

    if (response.user) {
      navigate("/dashboard");
    } else {
      console.log(response);
    }
  };
  return (
    <>
      <form onSubmit={handlesubmit}>
        <input type="password" name="password" autoComplete="true" />
        <input type="text" name="username" autoComplete="true" />
        <input type="submit" value="Login" />
      </form>
    </>
  );
};

export default Login;
