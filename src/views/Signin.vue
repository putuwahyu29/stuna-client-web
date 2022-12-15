<template>
  <div>
    <div class="container top-0 position-sticky z-index-sticky">
      <div class="row">
        <div class="col-12">
          <navbar
            isBlur="blur  border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
            v-bind:darkMode="true"
            isBtn="bg-gradient-success"
          />
        </div>
      </div>
    </div>
    <main class="mt-0 main-content">
      <section>
        <div class="page-header min-vh-100">
          <div class="container">
            <div class="row">
              
              <div
                class="mx-auto col-xl-5 col-lg-5 col-md-7 d-flex flex-column mx-lg-0"
              >
                <div class="card card-plain">
                  <div class="pb-0 card-header text-start">
                    <h4 class="font-weight-bolder mt-5">Masuk</h4>
                    <p class="mb-0">
                      Masukkan nama pengguna dan kata sandi anda
                    </p>
                  </div>
                  <div class="card-body">
                    <Form @submit="handleLogin" :validation-schema="schema">
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
                          name="password"
                          type="password"
                          class="form-control"
                          placeholder="Kata Sandi"
                        />
                        <ErrorMessage name="password" class="error-feedback" />
                      </div>
                      <div class="text-center">
                        <argon-button
                          class="mt-4"
                          color="success"
                          fullWidth
                          size="lg"
                          :disabled="loading"
                          ><span
                            v-show="loading"
                            class="spinner-border spinner-border-sm"
                          ></span>
                          <span>Masuk</span></argon-button
                        >
                      </div>
                    </Form>
                  </div>
                  <div class="px-1 pt-0 text-center card-footer px-lg-2">
                    <p class="mx-auto mb-4 text-sm">
                      Belum punya akun?
                      <router-link
                        class="text-success font-weight-bold"
                        to="/signup"
                        >Klik disini untuk mendaftar.</router-link
                      >
                    </p>
                  </div>
                </div>
              </div>
              
              <div
                class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
              >
                <div
                  class="position-relative bg-success h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                >
                  <span class="mask bg-success opacity-6"></span>
                  <h4
                    class="mt-5 text-white font-weight-bolder position-relative"
                  >
                    "Student Announcement Application"
                  </h4>
                  <p class="text-white position-relative">
                    Aplikasi pengumuman untuk membantu mahasiswa untuk melihat
                    pengumuman pengumuman yang ada
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <app-footer />
  </div>
</template>

<style>
.error-feedback {
  color: red;
  font-size: 14px;
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
  name: "signin",
  components: {
    Form,
    Field,
    Navbar,
    AppFooter,
    ArgonButton,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Nama pengguna wajib diisi!"),
      password: yup.string().required("Kata sandi wajib diisi!"),
    });
    return {
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
  created() {
    if (this.loggedIn) {
      this.$router.push("/profil");
    }
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  methods: {
    handleLogin(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$swal({
            position: "top-end",
            icon: "success",
            title: "Berhasil masuk",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.$router.push("/profil");
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
          let text = "";
          for (const x in this.message) {
            text += this.message[x] + ". ";
          }
          this.$swal({
            position: "top-end",
            icon: "error",
            title: "Gagal masuk",
            text: text,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
    },
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
