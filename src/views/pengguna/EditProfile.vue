<template>
  <main>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-md-12">
          <Form @submit="update()" :validation-schema="schema">
            <div class="card">
              <div class="card-header pb-0">
                <div class="d-flex align-items-center">
                  <p class="mb-0">Edit Profil</p>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12 mb-3">
                    <label for="example-text-input" class="form-control-label"
                      >Nama Pengguna</label
                    >
                    <Field
                      type="text"
                      class="form-control"
                      v-model="currentUser.user.username"
                      disabled
                      name="username"
                    />
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="example-text-input" class="form-control-label"
                      >Nama Lengkap</label
                    >
                    <Field
                      type="text"
                      class="form-control"
                      v-model="detail.fullName"
                      name="fullName"
                    />
                    <ErrorMessage name="fullName" class="error-feedback" />
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="example-text-input" class="form-control-label"
                      >Alamat Email</label
                    >
                    <Field
                      type="email"
                      class="form-control"
                      v-model="detail.email"
                      name="email"
                    />
                    <ErrorMessage name="email" class="error-feedback" />
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="example-text-input" class="form-control-label"
                      >Nama Panggilan</label
                    >
                    <Field
                      type="text"
                      class="form-control"
                      v-model="detail.nama_panggilan"
                      name="nama_panggilan"
                    />
                  </div>

                  <div class="col-md-12 mb-3">
                    <label for="example-text-input" class="form-control-label"
                      >NIM</label
                    >
                    <Field
                      type="text"
                      class="form-control"
                      v-model="detail.nim"
                      name="nim"
                    />
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="example-text-input" class="form-control-label"
                      >No Hp</label
                    >
                    <Field
                      type="text"
                      class="form-control"
                      v-model="detail.no_hp"
                      name="no_hp"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 mb-3">
                    <label for="kelas">Kelas</label>
                    <select
                      class="form-select"
                      v-model="detail.kelas_id"
                      v-on:change="filter"
                    >
                      <option
                        v-for="(k, index) in kelas"
                        :key="index"
                        v-bind:value="k.id"
                      >
                        {{ k.nama_kelas }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="example-text-input" class="form-control-label"
                      >Alamat Kos</label
                    >
                    <Field
                      type="text"
                      class="form-control"
                      v-model="detail.alamat"
                      name="alamat"
                    />
                  </div>
                </div>
                <button class="btn btn-success btn-md rounded shadow mb-3 mt-4">
                  Simpan
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import UserService from "@/services/user.service";
import KelasService from "@/services/kelas.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "profile",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Nama Pengguna tidak boleh kosong"),
      fullName: yup.string().required("Nama Lengkap tidak boleh kosong"),
      email: yup
        .string()
        .required("Email tidak boleh kosong")
        .email("Email tidak valid"),
    });
    return {
      showMenu: false,
      detail: [],
      kelas: [],
      schema,
    };
  },
  methods: {
    update() {
      UserService.updateUserByUsername(
        this.currentUser.user.username,
        this.detail
      ).then(
        () => {
          this.$swal({
            position: "top-end",
            icon: "success",
            title: "Profil berhasil diubah",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.$router.push("/profil");
          });
        },
        (error) => {
          this.$swal({
            position: "top-end",
            icon: "error",
            title: "Profil gagal diubah",
            html: error.response.data.messages.email,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  mounted() {
    KelasService.getAllKelas().then(
      (response) => {
        this.kelas = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
    UserService.getUserByUsername(this.currentUser.user.username).then(
      (response) => {
        this.detail = response.data;
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
