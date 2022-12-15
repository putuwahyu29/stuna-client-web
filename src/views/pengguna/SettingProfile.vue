<template>
  <main>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-md-12">
          <Form @submit="handleChangePassword" :validation-schema="schema">
            <div class="card">
              <div class="card-header pb-0">
                <div class="d-flex align-items-center">
                  <p class="mb-0">Pengaturan Profil</p>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <Field
                    type="hidden"
                    class="form-control"
                    v-model="currentUser.user.username"
                    name="username"
                  />
                  <div class="col-md-12 mb-3">
                    <label for="example-text-input" class="form-control-label"
                      >Kata Sandi Lama</label
                    >
                    <Field
                      type="password"
                      class="form-control"
                      name="oldPassword"
                    />
                    <ErrorMessage name="oldPassword" class="error-feedback" />
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="example-text-input" class="form-control-label"
                      >Kata Sandi Baru</label
                    >
                    <Field
                      type="password"
                      class="form-control"
                      name="newPassword"
                    />
                    <ErrorMessage name="newPassword" class="error-feedback" />
                  </div>

                  <div class="col-md-12 mb-3">
                    <label for="example-text-input" class="form-control-label"
                      >Ulangi Kata Sandi Baru</label
                    >
                    <Field
                      type="password"
                      class="form-control"
                      name="newPassword2"
                    />
                    <ErrorMessage name="newPassword2" class="error-feedback" />
                  </div>
                </div>
                <button class="btn btn-success btn-md rounded shadow mb-3 mt-4">
                  Ubah
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.error-feedback {
  color: red;
}
</style>

<script>
import EventBus from "@/common/EventBus";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "settingprofile",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      oldPassword: yup.string().required("Kata sandi lama wajib diisi!"),
      newPassword: yup.string().required("Kata sandi baru wajib diisi!"),
      newPassword2: yup
        .string()
        .required("Konfirmasi kata sandi wajib diisi!")
        .oneOf(
          [yup.ref("newPassword"), null],
          "Ulangi kata sandi baru tidak sama!"
        ),
    });
    return {
      showMenu: false,
      schema,
    };
  },
  methods: {
    handleChangePassword(user) {
      this.$store.dispatch("auth/changepassword", user).then(
        () => {
          this.$swal({
            position: "top-end",
            icon: "success",
            title: "Kata sandi berhasil diubah",
            text: "Silahkan masuk kembali",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.$store.dispatch("auth/logout");
            this.$router.push("/signin");
          });
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.$swal({
            position: "top-end",
            icon: "error",
            title: "Profil gagal diubah",
            html: this.message,
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
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeUnmount() {
    EventBus.remove("logout");
  },
};
</script>
