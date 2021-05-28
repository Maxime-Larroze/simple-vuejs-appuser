<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Création d'un nouvel utilisateur</h4>
        <button type="button" class="close" data-dismiss="modal">
          &times;
        </button>
      </div>
      <div class="modal-body">
        <div class="row text-center">
          <div class="col-md-12 mt-2 mb-2">
            <label for="modalAvatarUrl">Lien de la photo</label>
            <input
              type="text"
              class="form-control text-center"
              name="modalAvatarUrl"
              id="modalAvatarUrl"
              v-model="modalAvatarUrl"
            />
          </div>
          <div class="col-md-6  mt-2 mb-2">
            <div class="form-group">
              <label for="modalLastName">Nom</label>
              <input
                type="text"
                class="form-control text-center"
                placeholder="Votre nom"
                v-model="modalLastName"
                id="modalLastName"
              />
            </div>
          </div>
          <div class="col-md-6  mt-2 mb-2">
            <div class="form-group">
              <label for="modalFirstName">Prénom</label>
              <input
                type="text"
                class="form-control text-center"
                placeholder="Votre prénom"
                id="modalFirstName"
                v-model="modalFirstName"
              />
            </div>
          </div>

          <div class="col-md-6  mt-2 mb-2">
            <div class="form-group">
              <label for="modalPhone">Numéro de téléphone</label>
              <input
                type="tel"
                class="form-control text-center"
                placeholder="Votre numéro de téléphone"
                id="modalPhone"
                v-model="modalPhone"
              />
            </div>
          </div>
          <div class="col-md-6  mt-2 mb-2">
            <div class="form-group">
              <label for="modalEmail">Adresse email</label>
              <input
                type="email"
                class="form-control text-center"
                placeholder="Votre adresse email"
                id="modalEmail"
                v-model="modalEmail"
              />
            </div>
          </div>

          <div class="col-md-6  mt-2 mb-2">
            <div class="form-group">
              <label for="modalGender">Genre</label>
              <select v-model="modalGender" class="form-select text-center">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div class="col-md-6  mt-2 mb-2">
            <div class="form-group">
              <label for="modalAge">Date de naissance</label>
              <input
                type="date"
                class="form-control text-center"
                placeholder="Votre date de naissance"
                id="modalAge"
                v-model="modalAge"
              />
            </div>
          </div>

          <div class="col-md-12  mt-2 mb-2">
            <div class="form-group">
              <label for="modalDetails">Détails</label>
              <textarea
                class="form-control"
                rows="5"
                v-model="modalDetails"
                name="modalDetails"
                id="modalDetails"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" @click="createUser()">
          Valider
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "UserModal",
  data() {
    return {
      modalId: "",
      modalFirstName: "",
      modalLastName: "",
      modalEmail: "",
      modalPhone: "",
      modalGender: "",
      modalAvatarUrl: "",
      modalDetails: "",
      modalAge: "",
    };
  },
  methods: {
    createUser() {
      const modalUser = {
        firstName: this.modalFirstName,
        lastName: this.modalLastName,
        email: this.modalEmail,
        phone: this.modalPhone,
        gender: this.modalGender,
        avatarUrl: this.modalAvatar,
        details: this.modalDetails,
        birthDate: this.modalAge,
      };
      axios
        .post("https://ynov-front.herokuapp.com/api/users", modalUser)
        .then((response) => {
          this.modalId = response.data._id;
          console.log(this.response);
        });
      this.$router.push({ name: "/About", successCreate: true });
    },
  },
};
</script>
