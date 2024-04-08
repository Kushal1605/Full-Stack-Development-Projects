import authService from "./services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await authService.registerUser({
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
    });

    if (response.user) {
      navigate("/dashboard");
    } else {
      console.log("register error", response);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username"autoComplete="true" />
      <input type="text" name="email" autoComplete="true"/>
      <input type="password" name="password" autoComplete="true"/>
      <input type="submit" value="Register" />
    </form>
  );
};

export default Register;
