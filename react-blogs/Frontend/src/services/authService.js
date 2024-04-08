import axios from "axios";

export class AuthService {
  constructor() {
    axios.defaults.withCredentials = true;
  }

  async registerUser({ username, password, email }) {
    try {
      const response = await axios.post("http://localhost:3000/register", {
        username,
        password,
        email,
      });

      if (response.data.user) {
        return {user: response.data.user, message: "Register successfully"};
      } else {
        return {message: response.data.message || "Something went wrong. Please try again"};
      }
    } catch (err) {
      return { message: err.response.data.message || "Server error" };
    }
  }

  async loginUser({ username, password }) {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      if (response.data.user) {
        return { user: response.data.user, message: "Login successfull" }
      } else {
        return { message: "Invalid username or password" }
      }
    } catch (err) {
        return { message: err.response.data.message || "Server error" };
    }
  }

  async logoutUser() {
    try {
      const response = await axios.post('http://localhost:3000/logout')
      return { status: response.data.status, message: response.data.message }
    } catch (err) {
      return { status: false, message: err.response.data.message }
    }
  }

  async getCurrentUser() { 
    try {
      const response = await axios.get('http://localhost:3000/getuser')
      if (response.data.user) {
        return { user: response.data.user, message: response.data.message }
      } else {
        return { message: response.data.message }
      }
    } catch (err) {
      return { message: err.response.data.message || "Server error" };
    }
  }
}

export default new AuthService();
