import axios from "axios";
import authHeader from "./auth-header";
import uploadHeader from "./upload-header";

const API_URL = process.env.VUE_APP_SERVICE_URL;

class PengumumanService {
  getAllPengumuman() {
    return axios.get(API_URL + "pengumuman", { headers: authHeader() });
  }
  getPengumumanByKelasId(id) {
    return axios.get(API_URL + "pengumuman/" + id, {
      headers: authHeader(),
    });
  }
  getPengumumanByKelasIdLimit(id) {
    return axios.get(API_URL + "pengumuman/limit/" + id, {
      headers: authHeader(),
    });
  }
  getPengumumanTerbaru(id) {
    return axios.get(API_URL + "pengumuman/new/" + id, {
      headers: authHeader(),
    });
  }
  getPengumumanBySlug(slug) {
    return axios.get(API_URL + "pengumuman/" + slug, { headers: authHeader() });
  }
  createPengumuman(input) {
    return axios.post(API_URL + "pengumuman", input, {
      headers: uploadHeader(),
    });
  }
  updatePengumumanBySlug(slug, input) {
    return axios.put(API_URL + "pengumuman/" + slug, input, {
      headers: authHeader(),
    });
  }
  deletePengumumanBySlug(slug) {
    return axios.delete(API_URL + "pengumuman/" + slug, {
      headers: authHeader(),
    });
  }
}

export default new PengumumanService();
