<template>
  <div>
    <button class="btn btn-primary text-white" @click="openModal">
      <i class="fas fa-external-link-alt"></i> Créer un nouvel utilisateur
    </button>
    <transition name="fade">
      <div class="modal show" v-if="show">
        <div class="modal" id="myModal">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Créer un nouvel utilisateur</h4>
                <button
                  type="button"
                  class="close btn btn-secondary"
                  @click="closeModal()"
                >
                  &times;
                </button>
              </div>

              <!-- Modal body -->
              <div class="modal-body">
                <div class="row text-center">
                  <div
                    class="col-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-2 mb-2"
                  >
                    <label for="modalAvatarUrl">Lien de la photo</label>
                    <input
                      type="text"
                      class="form-control text-center"
                      name="modalAvatarUrl"
                      id="modalAvatarUrl"
                      v-model="modalAvatarUrl"
                      placeholder="Adresse URL de l'image de profil"
                    />
                  </div>
                  <div
                    class="col-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-2 mb-2"
                  >
                    <div class="form-group">
                      <label for="modalLastName">Nom</label>
                      <input
                        type="text"
                        class="form-control text-center"
                        placeholder="Votre nom"
                        id="modalLastName"
                        name="modalLastName"
                        v-model="modalLastName"
                      />
                    </div>
                  </div>
                  <div
                    class="col-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-2 mb-2"
                  >
                    <div class="form-group">
                      <label for="modalFirstName">Prénom</label>
                      <input
                        type="text"
                        class="form-control text-center"
                        placeholder="Votre prénom"
                        id="modalFirstName"
                        name="modalFirstName"
                        v-model="modalFirstName"
                      />
                    </div>
                  </div>

                  <div
                    class="col-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-2 mb-2"
                  >
                    <div class="form-group">
                      <label for="modalPhone">Numéro de téléphone</label>
                      <input
                        type="tel"
                        class="form-control text-center"
                        placeholder="Votre numéro de téléphone"
                        id="modalPhone"
                        name="modalPhone"
                        v-model="modalPhone"
                      />
                    </div>
                  </div>
                  <div
                    class="col-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-2 mb-2"
                  >
                    <div class="form-group">
                      <label for="modalEmail">Adresse email</label>
                      <input
                        type="email"
                        class="form-control text-center"
                        placeholder="Votre adresse email"
                        id="modalEmail"
                        name="modalEmail"
                        v-model="modalEmail"
                      />
                    </div>
                  </div>

                  <div
                    class="col-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-2 mb-2"
                  >
                    <div class="form-group">
                      <label for="modalGender">Genre</label>
                      <select
                        class="form-select text-center"
                        name="modalGender"
                        v-model="modalGender"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div
                    class="col-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-2 mb-2"
                  >
                    <div class="form-group">
                      <label for="modalAge">Date de naissance</label>
                      <input
                        type="date"
                        class="form-control text-center"
                        placeholder="Votre date de naissance"
                        id="modalAge"
                        name="modalAge"
                        v-model="modalAge"
                      />
                    </div>
                  </div>

                  <div
                    class="col-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-2 mb-2"
                  >
                    <div class="form-group">
                      <label for="modalDetails">Détails</label>
                      <textarea
                        class="form-control"
                        rows="5"
                        placeholder="Note de l'utilisateur"
                        name="modalDetails"
                        id="modalDetails"
                        v-model="modalDetails"
                      ></textarea>
                    </div>
                  </div>
                  <div
                    class="col-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-2 mb-2 text-center"
                  >
                    <button class="btn btn-primary" @click="createUser()">
                      <i class="far fa-plus-square"></i> Créer l'utilisateur
                    </button>
                  </div>
                  <div
                    class="col-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-2 mb-2 text-center"
                  >
                    <button
                      type="button"
                      class="btn btn-danger"
                      @click="closeModal()"
                    >
                      <i class="fas fa-ban"></i> Annuler
                    </button>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <p>
                  Copyright
                  <a href="http://hackenathon-system.ddns.net:35000/"
                    >Hackenathon-System</a
                  >
                  &copy; 2021 - Tous droits réservés
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "UserModal",
  data() {
    return {
      modalFirstName: "",
      modalLastName: "",
      modalEmail: "",
      modalPhone: "",
      modalGender: "",
      modalAvatarUrl: "",
      modalDetails: "",
      modalAge: "",
      show: false,
    };
  },
  mounted() {
    document.body.addEventListener("keyup", (e) => {
      if (e.keyCode === 27) {
        this.show = false;
        document.querySelector("body").classList.remove("overflow-hidden");
      }
    });
  },
  methods: {
    closeModal() {
      this.show = false;
      document.querySelector("body").classList.remove("overflow-hidden");
    },
    openModal() {
      this.show = true;
      document.querySelector("body").classList.add("overflow-hidden");
    },
    createUser() {
      const modalUser = {
        firstName: this.modalFirstName,
        lastName: this.modalLastName,
        email: this.modalEmail,
        phone: this.modalPhone,
        gender: this.modalGender,
        avatarUrl: this.modalAvatarUrl,
        details: this.modalDetails,
        birthDate: this.modalAge,
      };
      axios
        .post("https://ynov-front.herokuapp.com/api/users", modalUser)
        .then((response) => {
          console.log(response);
          console.log(response.status);
          if (response.status === 200 || response.status === 204) {
            this.$router.push({ path: "/about/" + 0 });
          }
        })
        .catch((error) => {
          this.showError();
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.modal {
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  &__backdrop {
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
  &__dialog {
    background-color: #ffffff;
    position: relative;
    width: 600px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    z-index: 2;
    @media screen and (max-width: 992px) {
      width: 90%;
    }
  }
  &__close {
    width: 30px;
    height: 30px;
  }
  &__header {
    padding: 20px 20px 10px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  &__body {
    padding: 10px 20px 10px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  &__footer {
    padding: 10px 20px 20px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
