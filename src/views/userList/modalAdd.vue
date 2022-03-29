<template>
  <b-modal
    id="modalAdd"
    title="Add New User"
    centered
    size="lg"
    header-bg-variant="primary"
    header-text-variant="light"
  >
    <section class="forms">
      <b-form-group
        id="username-input"
        label="Username :"
        label-for="username-input"
      >
        <b-form-input
          id="username-input"
          type="text"
          placeholder="Username"
          v-model="data.username"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="password-input"
        label="Password :"
        label-for="password-input"
      >
        <b-form-input
          id="password-input"
          type="password"
          placeholder="Password"
          v-model="data.password"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="name-input" label="Full Name :" label-for="name-input">
        <b-form-input
          id="name-input"
          type="text"
          placeholder="Full Name"
          v-model="data.nama"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="dob-input" label="Email :" label-for="email-input">
        <b-form-input
          id="email-input"
          type="text"
          placeholder="Email"
          v-model="data.email"
        ></b-form-input>
      </b-form-group>
    </section>

    <template #modal-footer>
      <b-button
        size="sm"
        variant="secondary"
        style="width: 80px"
        @click="$bvModal.hide('modalAdd')"
      >
        Cancel
      </b-button>
      <b-button
        :disabled="loading"
        size="sm"
        style="width: 80px"
        variant="primary"
        @click="onRegis"
      >
        <span v-if="!loading">Edit</span>
        <Spinner v-else />
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import axios from "@/baseURL";
import lodash from "lodash";
// import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

export default {
  data() {
    return {
      loading: false,
      show: false,
      msg: "",
      variant: "",
      data: {
        username: "",
        password: "",
        nama: "",
        email: "",
      },
    };
  },
  methods: {
    async onRegis() {
      let vm = this;
      vm.loading = true;

      try {
        let regis = await axios.post("user/register", vm.data);
        vm.loading = false;

        if (regis.data.message === "sukses") {
          vm.$emit("alertFromChild", {
            variant: "success",
            msg: "Add New Account Succeeded!",
            show: true,
          });
          vm.loading = false;
          vm.$bvModal.hide("modalAdd");
        } else {
          vm.$emit("alertFromChild", {
            variant: "danger",
            msg: lodash.toUpper(regis.data.message),
            show: true,
          });
          vm.loading = false;
        }
      } catch (error) {
        vm.$emit("alertFromChild", {
          variant: "danger",
          msg: lodash.toUpper(error.message),
          show: true,
        });
      }
    },
  },
};
</script>

<style></style>
