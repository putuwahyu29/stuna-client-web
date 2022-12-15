<template>
  <div
    class="card card-plain shadow-none"
    id="sidenavCard"
  >
    <a
      @click.prevent="logOut"
      href="#"
      target="_blank"
      class="btn btn-danger btn-sm w-100"
      >Keluar</a
    >
  </div>
</template>
<script>
import EventBus from "../../common/EventBus";
export default {
  name: "sidenav-card",
  methods: {
    logOut() {
      this.$swal({
        title: "Apakah Anda yakin ingin keluar?",
        text: "Keluar akun sekarang!",
        icon: "question",
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
            title: "Berhasil keluar",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.$store.dispatch("auth/logout");
            this.$router.push("/signin");
          });
        }
      });
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeUnmount() {
    EventBus.remove("logout");
  },
};
</script>
