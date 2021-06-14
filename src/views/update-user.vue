<template>
  <div class="container">
    <div>
      <div class="text-left">
        <a @click="$router.go(-1)"><i class="fas fa-undo-alt"></i> Retour</a>
      </div>
      <div class="card mb-2 mt-2">
        <div class="card-header p-3">
          <h1>Détail de l'utilisateur {{ firstName }} {{ lastName }}</h1>
        </div>
        <div class="text-danger text-center" v-show="isErrorVisible">
          Impossible de modifier cet utilisateur. Veuillez réessayer dans un
          instant.
        </div>
        <div class="card-body">
          <div class="row text-center">
            <div
              class="col-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-2 mb-2"
            >
              <img :src="avatar" class="mx-auto d-block" width="20%" />
            </div>
            <div
              class="col-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-2 mb-2"
            >
              <label for="avatarUrl">Lien de la photo</label>
              <input
                type="text"
                class="form-control text-center"
                name="avatar"
                id="avatar"
                v-model="avatar"
              />
            </div>
            <div class="col-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-2 mb-2">
              <div class="form-group">
                <label for="lastName">Nom</label>
                <input
                  type="text"
                  class="form-control text-center"
                  placeholder="Votre nom"
                  v-model="lastName"
                  id="lastName"
                />
              </div>
            </div>
            <div class="col-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-2 mb-2">
              <div class="form-group">
                <label for="firstname">Prénom</label>
                <input
                  type="text"
                  class="form-control text-center"
                  placeholder="Votre prénom"
                  id="firstName"
                  v-model="firstName"
                />
              </div>
            </div>

            <div class="col-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-2 mb-2">
              <div class="form-group">
                <label for="phone">Numéro de téléphone</label>
                <input
                  type="tel"
                  class="form-control text-center"
                  placeholder="Votre numéro de téléphone"
                  id="phone"
                  v-model="phone"
                />
              </div>
            </div>
            <div class="col-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-2 mb-2">
              <div class="form-group">
                <label for="email">Adresse email</label>
                <input
                  type="email"
                  class="form-control text-center"
                  placeholder="Votre adresse email"
                  id="email"
                  v-model="email"
                />
              </div>
            </div>

            <div class="col-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-2 mb-2">
              <div class="form-group">
                <label for="gender">Genre</label>
                <select v-model="gender" class="form-select text-center">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div class="col-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-2 mb-2">
              <div class="form-group">
                <label for="age">Date de naissance</label>
                <input
                  type="month"
                  class="form-control text-center"
                  placeholder="Votre date de naissance"
                  id="age"
                  v-model="age"
                />
              </div>
            </div>

            <div
              class="col-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-2 mb-2"
            >
              <div class="form-group">
                <label for="details">Détails</label>
                <textarea
                  class="form-control"
                  rows="5"
                  v-model="details"
                  name="details"
                  id="details"
                ></textarea>
              </div>
              <button
                class="text-center btn btn-success mt-3"
                @click="updateUser(id)"
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-header p-3">
        <p>Copyright Hackenathon-System &copy; 2021 - Tous droits réservés</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  created() {
    this.fetchUsers(this.$route.params.id);
  },
  data() {
    return {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      avatar: "",
      details: "",
      age: "",
      isErrorVisible: false,
    };
  },
  computed: {},
  methods: {
    showError() {
      this.isErrorVisible = true;
    },
    async fetchUsers(id) {
      await axios("https://ynov-front.herokuapp.com/api/users/" + id).then(
        ({ data: { data } }) => {
          (this.age = new Date(data.birthDate).toLocaleDateString("fr-FR")),
            (this.firstName = `${data.firstName}`),
            (this.lastName = `${data.lastName.toUpperCase()}`),
            (this.email = data.email),
            (this.phone = data.phone),
            (this.gender = data.gender),
            (this.avatar = data.avatarUrl),
            (this.details = data.details),
            (this.id = data._id);
        }
      );
    },
    updateUser(id) {
      const user = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        gender: this.gender,
        avatarUrl: this.avatar,
        details: this.details,
        birthDate: new Date(this.age),
      };
      axios
        .put("https://ynov-front.herokuapp.com/api/users/" + id, user)
        .then((response) => {
          if (response.status === 204) {
            this.$router.push({ path: "/about/" + "1" });
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
