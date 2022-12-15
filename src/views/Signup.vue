<template>
  <div>
    <div class="container top-0 position-sticky z-index-sticky">
      <div class="row">
        <div class="col-12">
          <navbar
            isBlur="blur border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
            v-bind:darkMode="true"
            isBtn="bg-success"
          />
        </div>
      </div>
    </div>
    <main class="main-content mt-0">
      <div
        class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
      >
        <span class="mask bg-success"></span>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-5 text-center mx-auto">
              <h1 class="text-white mb-2 mt-5">Selamat Datang!</h1>
              <p class="text-lead text-white">
                Silahkan buat akun untuk melanjutkan
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
          <div class="col-xl-7 col-lg-7 col-md-7 mx-auto">
            <div class="card z-index-0">
              <div class="card-body">
                <Form @submit="handleRegister" :validation-schema="schema">
                  <div class="mb-3">
                    <Field
                      name="fullName"
                      type="text"
                      class="form-control"
                      placeholder="Nama Lengkap"
                    />
                    <ErrorMessage name="fullName" class="error-feedback" />
                  </div>
                  <div class="mb-3">
                    <Field
                      name="username"
                      type="text"
                      class="form-control"
                      placeholder="Nama Pengguna"
                    />
                    <ErrorMessage name="username" class="error-feedback" />
                  </div>
                  <div class="mb-3">
                    <Field
                      name="email"
                      type="email"
                      class="form-control"
                      placeholder="Email"
                    />
                    <ErrorMessage name="email" class="error-feedback" />
                  </div>
                  <div class="mb-3">
                    <Field
                      name="password"
                      type="password"
                      class="form-control"
                      placeholder="Kata Sandi"
                    />
                    <ErrorMessage name="password" class="error-feedback" />
                  </div>
                  <div class="mb-3">
                    <Field
                      name="passwordConfirm"
                      type="password"
                      class="form-control"
                      placeholder="Konfirmasi Kata Sandi"
                    />
                    <ErrorMessage
                      name="passwordConfirm"
                      class="error-feedback"
                    />
                  </div>
                  <div class="text-center">
                    <argon-button
                      fullWidth
                      color="success"
                      class="my-4 mb-2"
                      :disabled="loading"
                    >
                      <span
                        v-show="loading"
                        class="spinner-border spinner-border-sm"
                      ></span>
                      Daftar</argon-button
                    >
                  </div>
                  <p class="text-sm mt-3 mb-0">
                    Sudah punya akun?
                    <router-link
                      class="text-success font-weight-bolder"
                      to="/signin"
                      >Masuk sekarang</router-link
                    >
                  </p>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <app-footer />
  </div>
</template>

<style>
.error-feedback {
  color: red;
}
</style>

<script>
import Navbar from "@/layouts/PageLayout/Navbar.vue";
import AppFooter from "@/layouts/PageLayout/Footer.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "signup",
  components: {
    Form,
    Field,
    ErrorMessage,
    Navbar,
    AppFooter,
    ArgonButton,
  },
  data() {
    const schema = yup.object().shape({
      fullName: yup.string().required("Nama Lengkap harus diisi"),
      username: yup
        .string()
        .required("Nama pengguna wajib diisi!")
        .min(3, "Harus minimal 3 karakter!")
        .max(20, "Harus minimal 3 karakter!"),
      email: yup
        .string()
        .required("Email wajib diisi!")
        .email("Email tidak valid!")
        .max(50, "Harus maksimal 50 karakter!"),
      password: yup
        .string()
        .required("Kata sandi wajib diisi!")
        .min(8, "Harus minimal 8 karakter!")
        .max(40, "Harus minimal 40 karakter!"),
      passwordConfirm: yup
        .string()
        .required("Konfirmasi kata sandi wajib diisi!")
        .oneOf([yup.ref("password"), null], "Kata sandi tidak sama!"),
    });
    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profil");
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$swal({
            position: "top-end",
            icon: "success",
            title: "Berhasil membuat akun!",
            text: "Silahkan masuk untuk melanjutkan",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.$router.push("/signin");
          });
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          let text = "";
          for (const x in this.message) {
            text += this.message[x] + ". ";
          }
          this.$swal({
            position: "top-end",
            icon: "error",
            title: "Gagal membuat akun!",
            text: text,
            showConfirmButton: false,
            timer: 1500,
          });
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
};
</script>
