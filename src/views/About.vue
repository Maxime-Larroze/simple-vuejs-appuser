<template>
  <div class="container-fluid">
    <div>
      <div class="card mb-2 mt-2">
        <div class="card-header p-3">
          <h1>VueJS APP User example</h1>
        </div>
        <div class="card-body">
          <div class="row text-center">
            <div class="text-danger text-center" v-show="isErrorVisible">
              Impossible de supprimer cet utilisateur. Veuillez réessayer dans
              un instant.
            </div>
            <div
              class="col-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-2 mb-2"
            >
              <div
                class="text-success text-center"
                v-show="this.$route.params.success === '0'"
              >
                L'utilisateur à bien été créé
              </div>
              <div
                class="text-success text-center"
                v-show="this.$route.params.success === '1'"
              >
                L'utilisateur à bien été mis à jour
              </div>
              <div
                class="text-success text-center"
                v-show="this.$route.params.success === '2'"
              >
                L'utilisateur à bien été supprimé
              </div>
            </div>
            <div class="col-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
              <Listview :options="['All', 'male', 'female']" v-model="gender" />
            </div>
            <div class="col-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
              <input
                id="search"
                v-model="search"
                type="text"
                name="search"
                class="form-control"
                placeholder="Rechercher"
              />
            </div>
            <div class="col-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
              <span class="lead">{{ filteredList.length }} utilisateurs</span>
            </div>
            <div class="col-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
              <UserModal></UserModal>
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
                  style="width: 100px;"
                />
              </td>
              <td v-html="user.nameFormated" />
              <td>
                <a v-bind:href="'mailto:' + user.email">{{ user.email }}</a>
              </td>
              <td>
                <a v-bind:href="'mailto:' + user.phone">{{ user.phone }}</a>
              </td>
              <td>{{ user.age }}</td>
              <td>{{ user.gender }}</td>
              <td>
                <div class="row">
                  <div class="col-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <router-link :to="{ path: '/users/' + user.id }"
                      ><button class="btn btn-primary">
                        <i class="fas fa-eye"></i></button
                    ></router-link>
                  </div>
                  <div class="col-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <router-link :to="{ path: '/users/update/' + user.id }"
                      ><button class="btn btn-warning">
                        <i class="fas fa-edit text-white"></i></button
                    ></router-link>
                  </div>
                  <div class="col-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <button class="btn btn-danger" @click="deleteUser(user.id)">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card-header p-3">
      <p>Copyright Hackenathon-System &copy; 2021 - Tous droits réservés</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Listview from "../components/Listview.vue";
import UserModal from "../components/UserModal.vue";
export default {
  components: {
    Listview,
    UserModal,
  },
  created() {
    this.fetchUsers();
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
      isErrorVisible: false,
      isModalOpened: false,
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
    showError() {
      this.isErrorVisible = true;
    },
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
          console.log(this.result);
          if (response.status === 204 || response.status === 200) {
            this.$router.push({ path: "/about/" + 2 });
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
<style lang="scss">
.overflow-hidden {
  overflow: hidden;
}
</style>
