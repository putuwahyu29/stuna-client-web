import axios from "axios";

const API_URL = process.env.VUE_APP_SERVICE_URL;

class AuthService {
  login({ username, password }) {
    return axios
      .post(API_URL + "auth/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register({ fullName, username, email, password }) {
    return axios.post(API_URL + "auth/register", {
      fullName,
      username,
      email,
      password,
    });
  }

  changepassword({ username, oldPassword, newPassword }) {
    return axios.post(API_URL + "auth/changepassword", {
      username,
      oldPassword,
      newPassword,
    });
  }
}

export default new AuthService();
