<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card min-vh-75">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center">
              <p class="mb-0">Daftar Teman</p>
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
                      Nama
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 align-middle text-center"
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(u, index) in user" :key="index">
                    <td class="align-middle text-center">
                      <p class="text-xs font-weight-bold mb-0">
                        {{ index + 1 }}
                      </p>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-xs font-weight-bold mb-0">{{
                        u.fullName
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
                              @click.prevent="view(u.username)"
                            >
                              <i class="fa-solid fa-eye"></i>
                            </button>
                          </li>
                          <li v-if="role != 'ROLE_USER'">
                            <button
                              class="btn btn-sm btn-danger"
                              @click="destroy(u.username, index)"
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
              Lihat Profil Teman
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
                >Nama Lengkap</label
              >
              <input
                type="text"
                class="form-control"
                name="judul"
                v-model="viewModal.fullName"
                disabled
              />
            </div>
            <div>
              <label for="example-text-input" class="form-control-label"
                >Nama Panggilan</label
              >
              <input
                type="text"
                class="form-control"
                name="isi"
                v-model="viewModal.nama_pangilan"
                disabled
              />
            </div>
            <div>
              <label for="example-text-input" class="form-control-label"
                >NIM</label
              >
              <input
                type="text"
                class="form-control"
                name="isi"
                v-model="viewModal.nim"
                disabled
              />
            </div>
            <div>
              <label for="example-text-input" class="form-control-label"
                >No Hp</label
              >
              <input
                type="text"
                class="form-control"
                name="nohp"
                v-model="viewModal.no_hp"
                disabled
              />
            </div>
            <div>
              <label for="example-text-input" class="form-control-label"
                >Email</label
              >
              <input
                type="text"
                class="form-control"
                name="email"
                v-model="viewModal.email"
                disabled
              />
            </div>
            <div>
              <label for="example-text-input" class="form-control-label"
                >Alamat</label
              >
              <input
                type="text"
                class="form-control"
                name="alamat"
                v-model="viewModal.alamat"
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
  </div>
</template>

<script>
import UserService from "@/services/user.service";

export default {
  name: "admin",
  data() {
    return {
      viewModal: [],
      user: [],
      detail: [],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  methods: {
    view(username) {
      UserService.getUserByUsername(username).then((response) => {
        this.viewModal = response.data;
      });
    },
    viewAll() {
      UserService.getUserByKelasId(this.detail.kelas_id).then(
        (response) => {
          this.user = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    destroy(username, index) {
      this.$swal({
        title: "Apakah yakin ingin menghapus teman kelas?",
        text: "Admin yang dihapus tidak dapat dikembalikan!",
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
            UserService.deleteKelasUser(username).then(() => {
              this.viewAll();
              this.user.splice(index, 1);
            });
          });
        }
      });
    },
  },
  mounted() {
    UserService.getUserByUsername(this.currentUser.user.username).then(
      (response) => {
        this.detail = response.data;
        this.viewAll();
      },
      (error) => {
        console.log(error);
      }
    );
    if (!this.currentUser) {
      this.$router.push("/login");
    } else if (this.currentUser) {
      this.role = this.currentUser.user.roles;
    }
  },
};
</script>
