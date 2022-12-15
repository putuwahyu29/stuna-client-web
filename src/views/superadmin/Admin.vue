<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card min-vh-75">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center">
              <p class="mb-0">Daftar Admin</p>
              <button
                class="btn btn-success ms-auto btn-sm mb-0"
                data-bs-toggle="modal"
                data-bs-target="#addModal"
              >
                Tambah Admin
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
                      Nama Admin
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 align-middle text-center"
                    >
                      Kelas
                    </th>
                    <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 align-middle text-center"
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(a, index) in admin" :key="index">
                    <td class="align-middle text-center">
                      <p class="text-xs font-weight-bold mb-0">
                        {{ index + 1 }}
                      </p>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-xs font-weight-bold mb-0">{{
                        a.fullName
                      }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-xs font-weight-bold mb-0">{{
                        a.nama_kelas
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
                              @click.prevent="view(a.username)"
                            >
                              <i class="fa-solid fa-eye"></i>
                            </button>
                          </li>
                          <li>
                            <button
                              class="btn btn-sm btn-danger"
                              @click="destroy(a.username, index)"
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
            <h1 class="modal-title fs-5" id="exampleModalLabel">Lihat Admin</h1>
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
        <form @submit.prevent="create()">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Tambah Admin
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
                  >Nama Lengkap Admin</label
                >
                <select
                  class="form-select"
                  v-model="role.username"
                  v-on:change="filter"
                >
                  <option
                    v-for="(u, index) in user"
                    :key="index"
                    v-bind:value="u.username"
                  >
                    {{ u.fullName }} - Kelas {{ u.nama_kelas }}
                  </option>
                </select>
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
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import RoleService from "@/services/role.service";
import UserService from "@/services/user.service";

export default {
  name: "admin",
  data() {
    return {
      admin: [],
      kelas: "",
      viewModal: [],
      user: [],
      role: [],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  methods: {
    create() {
      RoleService.setRoleToAdmin(this.role.username).then(
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
          this.viewAllUser();
        },
        (error) => {
          this.$swal({
            position: "top-end",
            icon: "error",
            title: "Input Gagal",
            text: error,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      );
    },
    destroy(username, index) {
      this.$swal({
        title: "Apakah yakin ingin menghapus admin?",
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
            RoleService.deleteRoleAdmin(username).then(() => {
              this.viewAllUser();
              this.admin.splice(index, 1);
            });
          });
        }
      });
    },
    view(username) {
      UserService.getUserByUsername(username).then((response) => {
        this.viewModal = response.data;
      });
    },
    viewAll() {
      RoleService.getAllRoleAdmin().then(
        (response) => {
          this.admin = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    viewAllUser() {
      RoleService.getAllRoleUser().then((response) => {
        this.user = response.data;
      });
    },
  },
  mounted() {
    this.viewAll();
    this.viewAllUser();
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>
