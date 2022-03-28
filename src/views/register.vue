<template>
  <b-container>
    <b-row align-h="center">
      <b-col md="6" lg="6" xl="6">
        <section class="forms">
          <h2>Register Your Account</h2>
          <b-form-group
            id="email-input"
            label="Email :"
            label-for="email-input"
          >
            <b-form-input
              id="email-input"
              type="email"
              placeholder="Email"
              v-model="data.email"
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

          <b-button :disabled="loading" variant="primary" @click="onRegis">
            <span v-if="!loading">Login</span>
            <Spinner v-else />
          </b-button>
        </section>
      </b-col>
    </b-row>
    <Alert :show="show" :msg="msg" :variant="variant" />
  </b-container>
</template>

<script>
import moment from "moment";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const local = moment.locale("id");

export default {
  data() {
    return {
      locale: local,
      loading: false,
      show: false,
      msg: "",
      variant: "",
      data: {
        email: "",
        password: "",
        name: "",
        dob: "",
      },
    };
  },
  methods: {
    onRegis() {
      let vm = this;
      vm.loading = true;

      createUserWithEmailAndPassword(getAuth(), vm.data.email, vm.data.password)
        .then((res) => {
          if (res.user.accessToken) {
            vm.variant = "success";
            vm.msg = "Register Succeeded! You Will Be Redirected In 3 secs";
            vm.show = true;
            vm.loading = false;

            setTimeout(() => {
              vm.show = false;
              vm.$router.push("/");
            }, 3000);
          }
        })
        .catch((err) => {
          vm.variant = "danger";
          vm.msg = err.message;
          vm.show = true;

          setTimeout(() => {
            vm.show = false;
          }, 3000);
          vm.loading = false;
        });
    },
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
.alert {
  margin: auto;
  position: absolute;
  width: 30%;
  left: 0;
  right: 0;
  bottom: 25%;
}
</style>
