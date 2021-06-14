<template>
  <div>
    <select
      id="value"
      :value="value"
      @change="changeVal"
      class="form-select text-center"
      name="value"
    >
      <option disabled selected hidden>Sexe de l'utilisateur</option>
      <option v-for="item in options" :key="item.message">
        {{ item }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  name: "Listview",
  props: {
    value: String,
    options: Array,
  },
  methods: {
    changeVal(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>
