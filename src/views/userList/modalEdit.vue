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
          v-model="data.name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="dob-input"
        label="Date of Birth :"
        label-for="dob-input"
      >
        <DatePicker
          v-model="data.dob"
          type="date"
          placeholder="Select datetime"
          format="DD-MM-YYYY"
          style="width: 100%"
        />
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
      >
        <span v-if="!loading">Edit</span>
        <Spinner v-else />
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import moment from "moment";
const local = moment.locale("id");

export default {
  data() {
    return {
      locale: local,
      loading: false,
      data: {
        username: "",
        password: "",
        name: "",
        dob: "",
      },
    };
  },
};
</script>

<style></style>
