import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.VUE_APP_SERVICE_URL;

class RoleService {
  getAllRoles() {
    return axios.get(API_URL + "role", { headers: authHeader() });
  }
  getRoleById(id) {
    return axios.get(API_URL + "role/" + id, { headers: authHeader() });
  }
  createRole(input) {
    return axios.post(API_URL + "role", input, { headers: authHeader() });
  }
  updateRoleById(id, input) {
    return axios.put(API_URL + "role/" + id, input, { headers: authHeader() });
  }
  deleteRoleById(id) {
    return axios.delete(API_URL + "role/" + id, { headers: authHeader() });
  }

  getAllRoleAdmin() {
    return axios.get(API_URL + "role/alladmin", { headers: authHeader() });
  }

  getAllRoleUser() {
    return axios.get(API_URL + "role/alluser", { headers: authHeader() });
  }

  setRoleToAdmin(username) {
    return axios.get(API_URL + "role/setadmin/" + username, {
      headers: authHeader(),
    });
  }

  deleteRoleAdmin(username) {
    return axios.get(API_URL + "role/deleteadmin/" + username, {
      headers: authHeader(),
    });
  }
}

export default new RoleService();
