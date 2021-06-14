<template>
  <div class="container">
    <div class="text-left">
      <a @click="$router.go(-1)"><i class="fas fa-undo-alt"></i> Retour</a>
    </div>
    <div>
      <div class="card mb-2 mt-2">
        <div class="card-header p-3">
          <h1>Détail de l'utilisateur</h1>
        </div>
        <div class="card-body">
          <div class="row text-center">
            <div class="col-md-12 mt-2 mb-2">
              <img :src="avatar" class="mx-auto d-block" width="20%" />
            </div>

            <div class="col-md-6  mt-2 mb-2">
              <div class="form-group">
                <label for="lastName">Nom</label>
                <p>{{ lastName }}</p>
              </div>
            </div>
            <div class="col-md-6  mt-2 mb-2">
              <div class="form-group">
                <label for="firstname">Prénom</label>
                <p>{{ firstName }}</p>
              </div>
            </div>

            <div class="col-md-6  mt-2 mb-2">
              <div class="form-group">
                <label for="phone">Numéro de téléphone</label>
                <p>{{ phone }}</p>
              </div>
            </div>
            <div class="col-md-6  mt-2 mb-2">
              <div class="form-group">
                <label for="email">Adresse email</label>
                <p>{{ email }}</p>
              </div>
            </div>

            <div class="col-md-6  mt-2 mb-2">
              <div class="form-group">
                <label for="gender">Genre</label>
                <p>{{ gender }}</p>
              </div>
            </div>
            <div class="col-md-6  mt-2 mb-2">
              <div class="form-group">
                <label for="age">Date de naissance</label>
                <p>{{ age }}</p>
              </div>
            </div>

            <div class="col-md-12  mt-2 mb-2">
              <div class="form-group">
                <label for="details">Détails</label>
                <p>{{ details }}</p>
              </div>
            </div>

            <div class="col-md-12  mt-2 mb-2">
              <router-link :to="{ path: '/users/update/' + id }"
                ><button class="btn btn-warning text-white">
                  <i class="fas fa-edit"></i> Editer
                </button></router-link
              >
            </div>
          </div>
        </div>
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
    };
  },
  computed: {},
  methods: {
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
  },
};
</script>
