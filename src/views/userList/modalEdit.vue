<template>
  <b-modal
    id="modalEdit"
    title="Edit Data"
    centered
    size="lg"
    header-bg-variant="warning"
    header-text-variant="dark"
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
          disabled
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
          v-model="password"
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

      <b-form-group
        id="dob-input"
        label="Date of Birth :"
        label-for="dob-input"
      >
        <b-form-input
          id="name-input"
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
        @click="$bvModal.hide('modalEdit')"
      >
        Cancel
      </b-button>
      <b-button
        :disabled="loading"
        size="sm"
        style="width: 80px"
        variant="primary"
        @click="doEdit"
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
export default {
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      loading: false,
      password: "",
    };
  },
  methods: {
    async doEdit() {
      let vm = this;
      vm.loading = true;
      let dataSend = {};

      if (vm.password != "") {
        dataSend.username = vm.data.username;
        dataSend.email = vm.data.email;
        dataSend.nama = vm.data.nama;
        dataSend.password = vm.password;
      } else {
        dataSend.username = vm.data.username;
        dataSend.email = vm.data.email;
        dataSend.nama = vm.data.nama;
      }

      try {
        let editRes = await axios.post("user/update", dataSend, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        if (editRes.data.message === "sukses") {
          vm.$emit("alertFromChild", {
            msg: "Edit Account Succeeded!",
            variant: "success",
            show: true,
          });
          vm.loading = false;
          vm.$bvModal.hide("modalEdit");
        } else {
          vm.$emit("alertFromChild", {
            msg: lodash.toUpper(editRes.data.message),
            variant: "success",
            show: true,
          });
          vm.loading = false;
        }
      } catch (error) {
        vm.$emit("alertFromChild", {
          msg: error.message,
          variant: "success",
          show: true,
        });
        vm.loading = false;
      }
    },
  },
};
</script>

<style></style>
