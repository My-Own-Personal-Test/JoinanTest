<template>
  <b-container>
    <b-row align-h="center">
      <b-col md="6" lg="6" xl="6">
        <section class="forms">
          <h2>Register Your Account</h2>
          <b-form-group
            id="username-input"
            label="Username :"
            label-for="username-input"
          >
            <b-form-input
              id="username-input"
              type="text"
              placeholder="Username..."
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
              placeholder="Password..."
              v-model="data.password"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="name-input"
            label="Full Name :"
            label-for="name-input"
          >
            <b-form-input
              id="name-input"
              type="text"
              placeholder="Full Name..."
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

          <b-button
            :disabled="loading"
            variant="primary"
            @click="$router.push('/')"
          >
            <span v-if="!loading">Login</span>
            <Spinner v-else />
          </b-button>
        </section>
      </b-col>
    </b-row>
  </b-container>
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

<style scoped>
.forms {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.forms h2 {
  margin-bottom: 4%;
}
</style>
