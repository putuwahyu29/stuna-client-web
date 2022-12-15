<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="card mb-5">
          <span v-if="!pengumuman.length">
            <div class="card-header">Pengumuman</div>
            <div class="card-body">
              <div class="row mb-5">
                <div class="col">
                  <div class="card h-100">
                    <div class="card-header">
                      <h5 class="card-title text-center">
                        Belum tersedia pengumuman
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div></span
          >
          <span v-else>
            <div class="card-header">Pengumuman</div>
            <div class="card-body">
              <div class="row mb-5">
                <div class="col">
                  <div class="card">
                    <div class="card-header">
                      <h5 class="card-title text-center">
                        Pengumuman Terbaru !!!
                      </h5>
                    </div>
                    <img
                      v-bind:src="
                        baseurl + 'uploads/pengumuman/' + newPengumuman.gambar
                      "
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <h5 class="card-title">{{ newPengumuman.judul }}</h5>
                      <p class="card-text">
                        {{ newPengumuman.isi }}
                      </p>
                    </div>
                    <div class="card-footer text-muted">
                      <div>
                        <small class="text-muted"
                          >Diperbarui oleh {{ newPengumuman.fullName }} pada
                          {{ newPengumuman.updated_at }}</small
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </span>
        </div>

        <span v-if="pengumuman.length">
          <div class="card">
            <div class="card-body">
              <div class="row row-cols-1 row-cols-md-3 g-4">
                <div v-for="(p, index) in pengumuman" :key="index" class="col">
                  <div class="card h-100">
                    <div class="card-header">
                      <h5 class="card-title">{{ p.judul }}</h5>
                    </div>
                    <img
                      v-bind:src="baseurl + 'uploads/pengumuman/' + p.gambar"
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <p class="card-text">{{ p.excerpt }}</p>
                    </div>
                    <div class="card-footer text-muted">
                      <button
                        class="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#viewModal"
                        @click.prevent="view(p.slug)"
                      >
                        Baca Selengkapnya
                      </button>
                      <div>
                        <small class="text-muted"
                          >Diperbarui oleh {{ p.fullName }} pada
                          {{ p.updated_at }}</small
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center mt-5">
                <router-link
                  to="/pengumuman/all"
                  class="btn btn-success align-center"
                  >Lihat Semua Pengumuman</router-link
                >
              </div>
            </div>
          </div>
        </span>
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
              Lihat Pengumuman
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
              <img
                v-bind:src="baseurl + 'uploads/pengumuman/' + viewModal.gambar"
                class="card-img-top"
                alt="..."
              />
            </div>
            <div>
              <label for="example-text-input" class="form-control-label"
                >Judul</label
              >
              <input
                type="text"
                class="form-control"
                name="judul"
                v-model="viewModal.judul"
                disabled
              />
            </div>
            <div>
              <label for="example-text-input" class="form-control-label"
                >Isi</label
              >
              <textarea
                class="form-control"
                id="message-text"
                cols="30"
                rows="10"
                disabled
                v-model="viewModal.isi"
              ></textarea>
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
            <button
              class="btn btn-warning"
              data-bs-dismiss="modal"
              data-bs-target="#editModal"
              @click.prevent="view(viewModal.slug)"
              data-bs-toggle="modal"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      aria-labelledby="editModal"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div class="modal-dialog">
        <Form @submit="update(viewModal.slug)" :validation-schema="schema">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Edit Pengumuman
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
                <img
                  v-bind:src="
                    baseurl + 'uploads/pengumuman/' + viewModal.gambar
                  "
                  class="card-img-top"
                  alt="..."
                />
              </div>
              <div>
                <label for="example-text-input" class="form-control-label"
                  >Judul</label
                >
                <Field
                  type="text"
                  class="form-control"
                  name="judul"
                  v-model="viewModal.judul"
                  disabled
                />
                <ErrorMessage name="judul" class="error-feedback" />
              </div>
              <div>
                <label for="example-text-input" class="form-control-label"
                  >Isi</label
                >
                <Field
                  type="text"
                  name="isi"
                  v-slot="{ field }"
                  v-model="viewModal.isi"
                >
                  <textarea
                    class="form-control"
                    id="message-text"
                    cols="30"
                    rows="10"
                    v-bind="field"
                  ></textarea>
                </Field>
                <ErrorMessage name="isi" class="error-feedback" />
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
                Perbarui
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import PengumumanService from "@/services/pengumuman.service";
import UserService from "@/services/user.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "dashboard-default",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      judul: yup.string().required("Judul pengumuman harus diisi"),
      isi: yup.string().required("Isi pengumuman harus diisi"),
    });
    return {
      baseurl: process.env.VUE_APP_SERVICE_URL,
      pengumuman: [],
      viewModal: [],
      detail: [],
      newPengumuman: [],
      schema,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    viewAll() {
      PengumumanService.getPengumumanByKelasIdLimit(this.detail.kelas_id).then(
        (response) => {
          this.pengumuman = response.data;
          PengumumanService.getPengumumanTerbaru(this.detail.kelas_id).then(
            (response) => {
              this.newPengumuman = response.data;
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
    },
    view(slug) {
      PengumumanService.getPengumumanBySlug(slug).then((response) => {
        this.viewModal = response.data;
      });
    },
    update(slug) {
      PengumumanService.updatePengumumanBySlug(slug, {
        judul: this.viewModal.judul,
        isi: this.viewModal.isi,
        user_id: this.detail.id,
        kelas_id: this.detail.kelas_id,
        slug: slug,
      }).then(
        () => {
          this.$swal({
            position: "top-end",
            icon: "success",
            title: "Input sukses",
            text: "Data berhasil diubah",
            showConfirmButton: false,
            timer: 2000,
          });
          this.viewAll();
        },
        (error) => {
          this.$swal({
            position: "top-end",
            icon: "error",
            title: "Input Gagal",
            text: error.response.data.messages,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      );
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
    }
  },
};
</script>
