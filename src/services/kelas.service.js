import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.VUE_APP_SERVICE_URL 

class KelasService {
  getAllKelas() {
    return axios.get(API_URL + "kelas", { headers: authHeader() });
  }
  getKelasById(id) {
    return axios.get(API_URL + "kelas/" + id, { headers: authHeader() });
  }
  createKelas(input) {
    return axios.post(API_URL + "kelas", input, { headers: authHeader() });
  }
  updateKelasById(id, input) {
    return axios.put(API_URL + "kelas/" + id, input, { headers: authHeader() });
  }
  deleteKelasById(id) {
    return axios.delete(API_URL + "kelas/" + id, { headers: authHeader() });
  }
}

export default new KelasService();
