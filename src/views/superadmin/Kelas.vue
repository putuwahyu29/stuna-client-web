<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card min-vh-75">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center">
              <p class="mb-0">Daftar Kelas</p>
              <button
                class="btn btn-success ms-auto btn-sm mb-0"
                data-bs-toggle="modal"
                data-bs-target="#addModal"
              >
                Tambah Kelas
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
                      Nama Kelas
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 align-middle text-center"
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(k, index) in kelas" :key="index">
                    <td class="align-middle text-center">
                      <p class="text-xs font-weight-bold mb-0">
                        {{ index + 1 }}
                      </p>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-xs font-weight-bold mb-0">{{
                        k.nama_kelas
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
                              @click.prevent="view(k.id)"
                            >
                              <i class="fa-solid fa-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              class="btn btn-sm btn-warning"
                              data-bs-toggle="modal"
                              data-bs-target="#editModal"
                              @click.prevent="view(k.id)"
                            >
                              <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              class="btn btn-sm btn-danger"
                              @click="destroy(k.id, index)"
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
            <h1 class="modal-title fs-5" id="exampleModalLabel">Lihat Kelas</h1>
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
                >Nama Kelas</label
              >
              <input
                type="text"
                class="form-control"
                name="nama"
                v-model="viewModal.nama_kelas"
                disabled
              />
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
        <Form @submit="update(viewModal.id)" :validation-schema="schema">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Edit Kelas
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
                  >Nama Kelas</label
                >
                <Field
                  type="text"
                  class="form-control"
                  name="nama"
                  v-model="viewModal.nama_kelas"
                />
                <ErrorMessage name="nama" class="error-feedback" />
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
                Tambah Kelas
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
                  >Nama Kelas</label
                >
                <Field
                  type="text"
                  class="form-control"
                  name="nama"
                  v-model="addKelas.nama"
                />
                <ErrorMessage name="nama" class="error-feedback" />
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
import KelasService from "@/services/kelas.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "kelas",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      nama: yup.string().required("Nama kelas harus diisi"),
    });
    return {
      kelas: [],
      viewModal: [],
      addKelas: [],
      schema,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  methods: {
    destroy(id, index) {
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
            KelasService.deleteKelasById(id).then(() => {
              this.kelas.splice(index, 1);
            });
          });
        }
      });
    },
    viewAll() {
      KelasService.getAllKelas().then(
        (response) => {
          this.kelas = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    view(id) {
      KelasService.getKelasById(id).then(
        (response) => {
          this.viewModal = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    update(id) {
      KelasService.updateKelasById(id, this.viewModal).then(
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
      KelasService.createKelas({
        nama_kelas: this.addKelas.nama,
      }).then(
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
    this.viewAll();
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>
