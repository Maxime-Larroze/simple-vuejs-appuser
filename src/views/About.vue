<template>
  <div class="container-fluid">
    <div>
      <div class="card mb-2 mt-2">
        <div class="card-header p-3">
          <h1>VueJS APP User example</h1>
        </div>
        <UserModal />
        <div class="card-body">
          <div class="row text-center">
            <div class="col-md-6 mt-2 mb-2">
              <div
                class="alert alert-danger alert-dismissible fade show text-center"
                v-if="this.$route.params.successUpdate === 'undefined'"
              >
                <button type="button" class="close" data-dismiss="alert">
                  &times;
                </button>
                L'utilisateur à bien été créé
              </div>
              <div
                class="alert alert-danger alert-dismissible fade show text-center"
                v-show="this.$route.params.successUpdate === 'undefined'"
              >
                <button type="button" class="close" data-dismiss="alert">
                  &times;
                </button>
                L'utilisateur à bien été mis à jour
              </div>
              <div
                class="alert alert-danger alert-dismissible fade show text-center"
                v-show="this.$route.params.successDelete === 'undefined'"
              >
                <button type="button" class="close" data-dismiss="alert">
                  &times;
                </button>
                L'utilisateur à bien été supprimé
              </div>
            </div>
            <div class="col-md-6 mt-2 mb-2">
              <button class="btn btn-info" @click="show()">
                Créer un nouvel utilisateur
              </button>
            </div>
            <!-- <div class="col-md-12">
              <div class="spinner-grow text-primary"></div>
              <span> Chargement en cours... </span>
              <div class="spinner-grow text-primary"></div>
            </div> -->
            <Listview :options="['All', 'male', 'female']" v-model="gender" />
            <div class="col-md-4">
              <input
                id="search"
                v-model="search"
                type="text"
                name="search"
                class="form-control"
                placeholder="Rechercher"
              />
            </div>
            <div class="col-md-2">
              <span class="lead">{{ filteredList.length }} lignes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <table
          id="tbl-users"
          class="table table-hover table-striped thead-dark"
        >
          <thead>
            <tr>
              <th>
                Image
              </th>
              <th
                :class="[sortBy === 'name' ? sortDirection : '']"
                @click="sort('name')"
              >
                Nom
              </th>
              <th
                :class="[sortBy === 'email' ? sortDirection : '']"
                @click="sort('email')"
              >
                Email
              </th>
              <th
                :class="[sortBy === 'phone' ? sortDirection : '']"
                @click="sort('phone')"
              >
                Tel
              </th>
              <th
                :class="[sortBy === 'age' ? sortDirection : '']"
                @click="sort('age')"
              >
                Age
              </th>
              <th>Genre</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredList" :key="user.email">
              <td>
                <img
                  :src="user.avatar"
                  class="img img-fluid float-left card-img mx-auto d-block"
                  style="width: 10%;"
                />
              </td>
              <td v-html="user.nameFormated" />
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.age }}</td>
              <td>{{ user.gender }}</td>
              <td>
                <div class="row">
                  <div class="col-lg-6">
                    <router-link :to="{ path: '/user/' + user.id }"
                      ><button class="btn btn-warning">
                        Détails
                      </button></router-link
                    >
                  </div>
                  <div class="col-lg-6">
                    <button class="btn btn-danger" @click="deleteUser(user.id)">
                      Supprimer
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Listview from "../components/Listview.vue";
// import { loader } from "./components/Loader.vue";
import UserModal from "../components/UserModal.vue";

export default {
  components: {
    Listview,
    UserModal,
  },
  created() {
    this.fetchUsers();
    console.log(this.$route.params);
  },
  data() {
    return {
      show: false,
      gender: "",
      age: "",
      nonFilteredUsers: [],
      sortBy: "",
      sortDirection: "asc",
      search: "",
    };
  },
  computed: {
    searchWords() {
      if (!this.search.length) return [];
      return this.search.toLowerCase().split(" ");
    },
    filteredList() {
      return this.nonFilteredUsers
        .filter((user) =>
          this.searchWords.every((word) =>
            user.name
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(word)
          )
        )
        .filter((user) => {
          if (this.gender === "All") return true;
          if (this.gender === "") return true;
          return user.gender === this.gender;
        })
        .sort((p1, p2) => {
          const modifier = this.sortDirection === "asc" ? 1 : -1;
          if (!this.sortBy) return 0;
          if (typeof p1[this.sortBy] === "number")
            return modifier * (p1[this.sortBy] - p2[this.sortBy]);
          return modifier * p1[this.sortBy].localeCompare(p2[this.sortBy]);
        })
        .map((user) => {
          const nameFormated = this.searchWords.length
            ? user.name.replace(
                new RegExp(this.searchWords.join("|"), "gi"),
                '<span class="highlight">$&</span>'
              )
            : user.name;
          return {
            ...user,
            nameFormated,
          };
        });
    },
  },
  methods: {
    sort(sortby) {
      if (sortby === this.sortBy) {
        if (this.sortDirection === "desc") {
          this.sortBy = "";
          this.sortDirection = "asc";
          return;
        }
        if (this.sortDirection === "asc") {
          this.sortDirection = "desc";
          return;
        }
      }
      this.sortDirection = "asc";
      this.sortBy = sortby;
    },
    fetchUsers() {
      axios.defaults.showLoader = true;
      axios("https://ynov-front.herokuapp.com/api/users").then(
        ({ data: { data } }) => {
          this.nonFilteredUsers = data.map((user) => ({
            age:
              new Date(
                Date.now() - new Date(user.birthDate).getTime()
              ).getFullYear() - 1970,
            name: `${user.firstName} ${user.lastName.toUpperCase()}`,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            avatar: user.avatarUrl,
            details: user.details,
            id: user._id,
          }));
        }
      );
      axios.defaults.showLoader = false;
    },
    deleteUser(id) {
      axios
        .delete("https://ynov-front.herokuapp.com/api/users/" + id)
        .then((response) => {
          this.result.splice(id, 1);
          console.log(this.result);
        });
      this.$router.push({ name: "/About", successDelete: true });
    },
  },
};
</script>
