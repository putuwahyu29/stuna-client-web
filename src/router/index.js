import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Kelas from "../views/superadmin/Kelas.vue";
import Teman from "../views/fitur/Teman.vue";
import Admin from "../views/superadmin/Admin.vue";
import Role from "../views/superadmin/Role.vue";
import Pengumuman from "../views/admin/Pengumuman.vue";
import AllPengumuman from "../views/fitur/AllPengumuman.vue";
import Profile from "../views/pengguna/Profile.vue";
import EditProfile from "../views/pengguna/EditProfile.vue";
import SettingProfile from "../views/pengguna/SettingProfile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";

const routes = [
  {
    path: "/",
    name: "Dasbor",
    meta: { title: "Dasbor", authRequired: true },
    component: Dashboard,
  },
  {
    path: "/kelas",
    name: "Kelas",
    meta: { title: "Kelas", authRequired: true, superadminPages: true },
    component: Kelas,
  },
  {
    path: "/admin",
    name: "Admin",
    meta: { title: "Admin", authRequired: true, superadminPages: true },
    component: Admin,
  },
  {
    path: "/peran",
    name: "Peran",
    meta: { title: "Peran", authRequired: true, superadminPages: true },
    component: Role,
  },
  {
    path: "/pengumuman",
    name: "Pengumuman",
    meta: { title: "Pengumuman", authRequired: true, adminPages: true },
    component: Pengumuman,
  },
  {
    path: "/profil",
    name: "Profil",
    meta: { title: "Profil", authRequired: true },
    component: Profile,
  },
  {
    path: "/teman",
    name: "Teman",
    meta: { title: "Teman", authRequired: true },
    component: Teman,
  },
  {
    path: "/pengumuman/all",
    name: "Semua Pengumuman",
    meta: { title: "Semua Pengumuman", authRequired: true },
    component: AllPengumuman,
  },
  {
    path: "/profil/edit",
    name: "Edit Profil",
    meta: { title: "Edit Profil", authRequired: true },
    component: EditProfile,
  },
  {
    path: "/profil/pengaturan",
    name: "Pengaturan Profil",
    meta: { title: "Pengaturan Profil", authRequired: true },
    component: SettingProfile,
  },
  {
    path: "/signin",
    name: "Signin",
    meta: { title: "Masuk", authRequired: false },
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    meta: { title: "Daftar", authRequired: false },
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const authRequired = to.meta.authRequired;
  const loggedIn = localStorage.getItem("user");
  const authReqAdmin = to.meta.adminPages;
  const authReqSuperadmin = to.meta.superadminPages;
  const role = loggedIn ? JSON.parse(loggedIn).user.roles : null;
  if (authRequired && !loggedIn) {
    next("/signin");
  } else if (authRequired && loggedIn) {
    if (
      (authReqAdmin && role === "ROLE_ADMIN") ||
      ((authReqSuperadmin || authReqAdmin) && role === "ROLE_SUPERADMIN")
    ) {
      next();
    } else if (
      (authReqAdmin && role !== "ROLE_ADMIN") ||
      (authReqSuperadmin && role !== "ROLE_SUPERADMIN")
    ) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Stuna `;
  next();
});

export default router;
