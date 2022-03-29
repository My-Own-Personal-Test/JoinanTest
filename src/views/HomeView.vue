<template>
  <b-container>
    <b-row align-h="center">
      <b-col md="6" lg="6" xl="6">
        <section class="forms">
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

          <b-button :disabled="loading" variant="primary" @click="login">
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
import axios from "@/baseURL";
import lodash from "lodash";
export default {
  data() {
    return {
      loading: false,
      data: {
        username: "",
        password: "",
      },
      msg: "",
      variant: "",
      show: false,
    };
  },
  methods: {
    async login() {
      let vm = this;
      vm.loading = true;

      let postLogin = await axios.post("user/login", vm.data);

      if (postLogin.data.message === "sukses") {
        vm.loading = false;
        vm.$router.push("/users/list");
      } else {
        vm.loading = false;
        vm.msg = lodash.toUpper(postLogin.data.message);
        vm.variant = "danger";
        vm.show = true;

        setTimeout(() => {
          vm.show = false;
        }, 3000);
      }
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
.alert {
  margin: auto;
  position: absolute;
  width: 30%;
  left: 0;
  right: 0;
  bottom: 25%;
}
</style>
