<template>
  <main>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <p class="mb-0">Profil Saya</p>
                <router-link
                  to="/profil/edit"
                  class="btn btn-success ms-auto btn-sm mb-0"
                  >Edit Profil</router-link
                >
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <ArgonAlert v-if="kelas.nama_kelas == null" color="danger"
                  >Silahkan mengedit profil kemudian melengkapi anda agar dapat
                  melihat pengumuman untuk kelas anda.</ArgonAlert
                >
                <div class="col-md-12 mb-3">
                  <label for="example-text-input" class="form-control-label"
                    >Nama Pengguna</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="currentUser.user.username"
                    disabled
                  />
                </div>
                <div class="col-md-12 mb-3">
                  <label for="example-text-input" class="form-control-label"
                    >Nama Lengkap</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    v-model="detail.fullName"
                  />
                </div>
                <div class="col-md-12 mb-3">
                  <label for="example-text-input" class="form-control-label"
                    >Alamat Email</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    disabled
                    v-model="detail.email"
                  />
                </div>
                <div class="col-md-12 mb-3">
                  <label for="example-text-input" class="form-control-label"
                    >Nama Panggilan</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    v-model="detail.nama_panggilan"
                  />
                </div>
                <div class="col-md-12 mb-3">
                  <label for="example-text-input" class="form-control-label"
                    >NIM</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    v-model="detail.nim"
                  />
                </div>
                <div class="col-md-12 mb-3">
                  <label for="example-text-input" class="form-control-label"
                    >No Hp</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    v-model="detail.no_hp"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 mb-3">
                  <label for="kelas">Kelas</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    v-model="kelas.nama_kelas"
                  />
                </div>
                <div class="col-md-12 mb-3">
                  <label for="example-text-input" class="form-control-label"
                    >Alamat Kos</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    v-model="detail.alamat"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card card-profile">
            <img
              src="../../assets/img/bg-profile.jpg"
              alt="Image placeholder"
              class="card-img-top"
            />
            <div class="row justify-content-center">
              <div class="col-4 col-lg-4 order-lg-2">
                <div class="mt-n4 mt-lg-n6 mb-4 mb-lg-0">
                  <a href="javascript:;">
                    <img
                      src="../../assets/img/profile/default.jpg"
                      class="rounded-circle img-fluid border border-2 border-white"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div class="card-body pt-0">
              <div class="text-center mt-4">
                <h5>{{ detail.fullName }}</h5>
                <h6>{{ detail.nim }}</h6>
                <div class="h6 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>
                  {{ kelas.nama_kelas }}
                </div>
                <div>
                  <i class="ni education_hat mr-2"></i>Politeknik Statistika
                  STIS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import UserService from "@/services/user.service";
import KelasService from "@/services/kelas.service";
import ArgonAlert from "@/components/ArgonAlert.vue";

export default {
  name: "profile",
  data() {
    return {
      showMenu: false,
      detail: [],
      kelas: [],
    };
  },
  components: {
    ArgonAlert,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  mounted() {
    UserService.getUserByUsername(this.currentUser.user.username).then(
      (response) => {
        this.detail = response.data;
        KelasService.getKelasById(this.detail.kelas_id).then(
          (response) => {
            this.kelas = response.data;
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
