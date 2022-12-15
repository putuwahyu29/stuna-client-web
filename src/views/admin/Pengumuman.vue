<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card min-vh-75">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center">
              <p class="mb-0">Daftar Pengumuman</p>
              <button
                class="btn btn-success ms-auto btn-sm mb-0"
                data-bs-toggle="modal"
                data-bs-target="#addModal"
              >
                Tambah Pengumuman
              </button>
            </div>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0" id="tes">
                <thead>
                  <tr>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 align-middle text-center"
                    >
                      No.
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 align-middle text-center"
                    >
                      Judul Pengumuman
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 align-middle text-center"
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(p, index) in pengumuman" :key="index">
                    <td class="align-middle text-center">
                      <p class="text-xs font-weight-bold mb-0">
                        {{ index + 1 }}
                      </p>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-xs font-weight-bold mb-0">{{
                        p.judul
                      }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-xs font-weight-bold mb-0">
                        <ul class="list-unstyled">
                          <li>
                            <button
                              class="btn btn-sm btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#viewModal"
                              @click.prevent="view(p.slug)"
                            >
                              <i class="fa-solid fa-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              class="btn btn-sm btn-warning"
                              data-bs-toggle="modal"
                              data-bs-target="#editModal"
                              @click.prevent="view(p.slug)"
                            >
                              <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              class="btn btn-sm btn-danger"
                              @click="destroy(p.slug, index)"
                            >
                              <i class="fa-solid fa-trash"></i>
                            </button>
                          </li>
                        </ul>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- View Modal -->
    <div
      class="modal fade"
      id="viewModal"
      tabindex="-1"
      aria-labelledby="viewModal"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Lihat Pengumuman
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>
              <label for="example-text-input" class="form-control-label"
                >Judul</label
              >
              <input
                type="text"
                class="form-control"
                name="judul"
                v-model="viewModal.judul"
                disabled
              />
            </div>
            <div>
              <label for="example-text-input" class="form-control-label"
                >Isi</label
              >
              <textarea
                type="text"
                class="form-control"
                name="isi"
                cols="30"
                rows="10"
                v-model="viewModal.isi"
                disabled
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      aria-labelledby="editModal"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div class="modal-dialog">
        <Form @submit="update(viewModal.slug)" :validation-schema="schema">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Edit Pengumuman
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div>
                <label for="example-text-input" class="form-control-label"
                  >Judul</label
                >
                <Field
                  type="text"
                  class="form-control"
                  name="judul"
                  v-model="viewModal.judul"
                />
                <ErrorMessage name="judul" class="error-feedback" />
              </div>
              <div>
                <label for="example-text-input" class="form-control-label"
                  >Isi</label
                >
                <Field
                  type="text"
                  name="isi"
                  v-slot="{ field }"
                  v-model="viewModal.isi"
                >
                  <textarea
                    class="form-control"
                    id="message-text"
                    cols="30"
                    rows="10"
                    v-bind="field"
                  ></textarea>
                </Field>
                <ErrorMessage name="isi" class="error-feedback" />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Batal
              </button>
              <button data-bs-dismiss="modal" class="btn btn-success">
                Simpan
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>

    <!-- Add Modal -->
    <div
      class="modal fade"
      id="addModal"
      tabindex="-1"
      aria-labelledby="addModal"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div class="modal-dialog">
        <Form @submit="create()" :validation-schema="schema">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Tambah Pengumuman
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div>
                <label for="example-text-input" class="form-control-label"
                  >Dari</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="detail.fullName"
                  name="user_id"
                  disabled
                />
              </div>
              <div>
                <label for="example-text-input" class="form-control-label"
                  >Ke</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="kelas.nama_kelas"
                  name="kelas_id"
                  disabled
                />
              </div>
              <div>
                <label for="example-text-input" class="form-control-label"
                  >Judul</label
                >
                <Field
                  type="text"
                  class="form-control"
                  name="judul"
                  v-model="addPengumuman.judul"
                />
                <ErrorMessage name="judul" class="error-feedback" />
              </div>
              <div>
                <label for="example-text-input" class="form-control-label"
                  >Isi</label
                >
                <Field
                  type="text"
                  name="isi"
                  v-slot="{ field }"
                  v-model="addPengumuman.isi"
                >
                  <textarea
                    class="form-control"
                    id="message-text"
                    cols="30"
                    rows="10"
                    v-bind="field"
                  ></textarea>
                </Field>
                <ErrorMessage name="isi" class="error-feedback" />
              </div>
              <div>
                <label for="formFile" class="form-label">Gambar</label>
                <input
                  class="form-control"
                  type="file"
                  id="gambar"
                  name="gambar"
                  @change="onFileChange"
                />
              </div>
              <div class="mt-2">
                <img :src="previewImage" width="100" />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Batal
              </button>
              <button data-bs-dismiss="modal" class="btn btn-success">
                Tambah
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import PengumumanService from "@/services/pengumuman.service";
import UserService from "@/services/user.service";
import KelasService from "@/services/kelas.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "pengumuman",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      judul: yup.string().required("Judul pengumuman harus diisi"),
      isi: yup.string().required("Isi pengumuman harus diisi"),
    });
    return {
      pengumuman: [],
      viewModal: [],
      detail: [],
      addPengumuman: [],
      kelas: [],
      previewImage: null,
      schema,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.previewImage = URL.createObjectURL(file);
      this.addPengumuman.gambar = file;
    },
    viewAll() {
      PengumumanService.getPengumumanByKelasId(this.detail.kelas_id).then(
        (response) => {
          this.pengumuman = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    destroy(slug, index) {
      this.$swal({
        title: "Apakah yakin ingin menghapus data?",
        text: "Data akan terhapus secara permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Iya, Hapus",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal({
            position: "top-end",
            icon: "success",
            title: "Data berhasil dihapus",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            PengumumanService.deletePengumumanBySlug(slug).then(() => {
              this.pengumuman.splice(index, 1);
            });
          });
        }
      });
    },
    view(slug) {
      PengumumanService.getPengumumanBySlug(slug).then((response) => {
        this.viewModal = response.data;
      });
    },
    update(slug) {
      PengumumanService.updatePengumumanBySlug(slug, this.viewModal).then(
        () => {
          this.$swal({
            position: "top-end",
            icon: "success",
            title: "Input sukses",
            text: "Data berhasil diubah",
            showConfirmButton: false,
            timer: 2000,
          });
          this.viewAll();
        },
        (error) => {
          this.$swal({
            position: "top-end",
            icon: "error",
            title: "Input Gagal",
            text: error.response.data.messages,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      );
    },
    create() {
      let formData = new FormData();
      formData.append("judul", this.addPengumuman.judul);
      formData.append("isi", this.addPengumuman.isi);
      formData.append("gambar", this.addPengumuman.gambar);
      formData.append("kelas_id", this.detail.kelas_id);
      formData.append("user_id", this.detail.user_id);
      PengumumanService.createPengumuman(formData).then(
        () => {
          this.$swal({
            position: "top-end",
            icon: "success",
            title: "Input sukses",
            text: "Data berhasil ditambahkan!",
            showConfirmButton: false,
            timer: 2000,
          });
          this.viewAll();
        },
        (error) => {
          console.log(error);
          this.$swal({
            position: "top-end",
            icon: "error",
            title: "Input Gagal",
            text: error.response.data.messages,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      );
    },
  },
  mounted() {
    UserService.getUserByUsername(this.currentUser.user.username).then(
      (response) => {
        this.detail = response.data;
        KelasService.getKelasById(this.detail.kelas_id).then(
          (response) => {
            this.kelas = response.data;
            this.viewAll();
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>
