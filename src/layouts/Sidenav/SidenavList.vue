<template>
  <div>
    <div
      class="collapse navbar-collapse w-auto h-75"
      id="sidenav-collapse-main"
    >
      <ul class="navbar-nav">
        <li class="mt-3 nav-item">
          <h6
            class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6 ms-2"
          >
            Halaman Utama
          </h6>
        </li>
        <li class="nav-item">
          <sidenav-item
            url="/"
            :class="getRoute() === '/' ? 'active' : ''"
            :navText="'Dasbor'"
          >
            <template v-slot:icon>
              <i class="fa-solid fa-house text-success text-sm opacity-10"></i>
            </template>
          </sidenav-item>
        </li>
        <li class="mt-3 nav-item">
          <h6
            class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6 ms-2"
          >
            Fitur
          </h6>
        </li>
        <li class="nav-item">
          <sidenav-item
            url="/teman"
            :class="getRoute() === '/teman' ? 'active' : ''"
            :navText="'Teman Kelas'"
          >
            <template v-slot:icon>
              <i
                class="fa-solid fa-people-group text-success text-sm opacity-10"
              ></i>
            </template>
          </sidenav-item>
        </li>
        <li class="nav-item">
          <sidenav-item
            url="/pengumuman/all"
            :class="getRoute() === '/pengumuman/all' ? 'active' : ''"
            :navText="'Semua Pengumuman'"
          >
            <template v-slot:icon>
              <i
                class="fa-solid fa-message text-success text-sm opacity-10"
              ></i>
            </template>
          </sidenav-item>
        </li>
        <li class="mt-3 nav-item">
          <h6
            class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6 ms-2"
          >
            Pengaturan Pengguna
          </h6>
        </li>
        <li class="nav-item">
          <sidenav-item
            url="/profil"
            :class="getRoute() === '/profil' ? 'active' : ''"
            :navText="'Profil Saya'"
          >
            <template v-slot:icon>
              <i class="fa-solid fa-user text-success text-sm opacity-10"></i>
            </template>
          </sidenav-item>
        </li>
        <li class="nav-item">
          <sidenav-item
            url="/profil/edit"
            :class="getRoute() === '/profil/edit' ? 'active' : ''"
            :navText="'Edit Profil'"
          >
            <template v-slot:icon>
              <i
                class="fa-solid fa-user-pen text-success text-sm opacity-10"
              ></i>
            </template>
          </sidenav-item>
        </li>
        <li class="nav-item">
          <sidenav-item
            url="/profil/pengaturan"
            :class="getRoute() === '/profil/pengaturan' ? 'active' : ''"
            :navText="'Pengaturan Profill'"
          >
            <template v-slot:icon>
              <i
                class="fa-solid fa-user-gear text-success text-sm opacity-10"
              ></i>
            </template>
          </sidenav-item>
        </li>

        <li v-if="role != 'ROLE_USER'" class="mt-3 nav-item">
          <h6
            class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6 ms-2"
          >
            Pengaturan Admin
          </h6>
        </li>
        <li v-if="role != 'ROLE_USER'" class="nav-item">
          <sidenav-item
            url="/pengumuman"
            :class="getRoute() === '/pengumuman/' ? 'active' : ''"
            :navText="'Pengumuman'"
          >
            <template v-slot:icon>
              <i
                class="fa-solid fa-newspaper text-success text-sm opacity-10"
              ></i>
            </template>
          </sidenav-item>
        </li>
        <li v-if="role == 'ROLE_SUPERADMIN'" class="mt-3 nav-item">
          <h6
            class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6 ms-2"
          >
            Pengaturan Super Admin
          </h6>
        </li>
        <li v-if="role == 'ROLE_SUPERADMIN'" class="nav-item">
          <sidenav-item
            url="/kelas"
            :class="getRoute() === '/kelas' ? 'active' : ''"
            :navText="'Kelas'"
          >
            <template v-slot:icon>
              <i
                class="fa-solid fa-building text-success text-sm opacity-10"
              ></i>
            </template>
          </sidenav-item>
        </li>
        <li v-if="role == 'ROLE_SUPERADMIN'" class="nav-item">
          <sidenav-item
            url="/peran"
            :class="getRoute() === '/peran' ? 'active' : ''"
            :navText="'Peran'"
          >
            <template v-slot:icon>
              <i
                class="fa-solid fa-chess-king text-success text-sm opacity-10"
              ></i>
            </template>
          </sidenav-item>
        </li>
        <li v-if="role == 'ROLE_SUPERADMIN'" class="nav-item mb-3">
          <sidenav-item
            url="/admin"
            :class="getRoute() === '/admin' ? 'active' : ''"
            :navText="'Admin'"
          >
            <template v-slot:icon>
              <i class="fa-solid fa-crown text-success text-sm opacity-10"></i>
            </template>
          </sidenav-item>
        </li>
      </ul>
    </div>
    <div class="mt-1 mx-3 sidenav-footer">
      <sidenav-card />
    </div>
  </div>
</template>

<script>
import SidenavItem from "./SidenavItem.vue";
import SidenavCard from "./SidenavCard.vue";
// import UserService from "@/services/UserService.js";

export default {
  name: "SidenavList",
  data() {
    return {
      role: "",
    };
  },
  components: {
    SidenavItem,
    SidenavCard,
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/signin");
    } else if (this.currentUser) {
      this.role = this.currentUser.roles;
    }
  },
};
</script>
