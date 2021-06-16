<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="mt-5 mb-5">
      <h3 class="text-center">Requête api: {{ data.information }}</h3>
      <p class="text-center font-italic font-small">{{ data }}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
export default {
  name: "Home",
  data() {
    return {
      data: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios("http://localhost:8002/api/test")
        .then((response) => {
          console.log(response);
          this.data = response.data;
        })
        .catch((err) => {
          console.log("error: " + err);
        });
    },
  },
};
</script>
