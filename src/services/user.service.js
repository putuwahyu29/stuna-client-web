import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.VUE_APP_SERVICE_URL ;

class UserService {
  getAllUsers() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }
  getUserByUsername(username) {
    return axios.get(API_URL + "user/" + username, { headers: authHeader() });
  }
  updateUserByUsername(username, input) {
    return axios.put(API_URL + "user/" + username, input, {
      headers: authHeader(),
    });
  }
  getUserByKelasId(kelasid) {
    return axios.get(API_URL + "user/kelas/" + kelasid, {
      headers: authHeader(),
    });
  }
  deleteKelasUser(username) {
    return axios.get(API_URL + "user/kelas/delete/" + username, {
      headers: authHeader(),
    });
  }
}

export default new UserService();
