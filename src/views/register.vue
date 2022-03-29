<template>
  <b-container>
    <b-row align-h="center">
      <b-col md="6" lg="6" xl="6">
        <section class="forms">
          <h2>Register Your Account</h2>
          <b-form-group
            id="email-input"
            label="Username :"
            label-for="username-input"
          >
            <b-form-input
              id="username-input"
              type="email"
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

          <b-form-group label="Full Name :" label-for="name-input">
            <b-form-input
              id="name-input"
              type="text"
              placeholder="Full Name"
              v-model="data.nama"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Email :" label-for="email-input">
            <b-form-input
              id="email-input"
              type="email"
              placeholder="Email"
              v-model="data.email"
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
          vm.variant = "success";
          vm.msg = "Register Succeeded! You Will Be Redirected In 3 secs";
          vm.show = true;
          vm.loading = false;

          setTimeout(() => {
            vm.show = false;
            vm.$router.push("/");
          }, 3000);
        } else {
          vm.variant = "danger";
          vm.msg = lodash.toUpper(regis.data.message);
          vm.show = true;

          setTimeout(() => {
            vm.show = false;
          }, 3000);
          vm.loading = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // onRegis() {
    //   let vm = this;
    //   vm.loading = true;

    //   createUserWithEmailAndPassword(getAuth(), vm.data.email, vm.data.password)
    //     .then((res) => {
    //       if (res.user.accessToken) {
    //         vm.variant = "success";
    //         vm.msg = "Register Succeeded! You Will Be Redirected In 3 secs";
    //         vm.show = true;
    //         vm.loading = false;

    //         setTimeout(() => {
    //           vm.show = false;
    //           vm.$router.push("/");
    //         }, 3000);
    //       }
    //     })
    //     .catch((err) => {
    //       vm.variant = "danger";
    //       vm.msg = err.message;
    //       vm.show = true;

    //       setTimeout(() => {
    //         vm.show = false;
    //       }, 3000);
    //       vm.loading = false;
    //     });
    // },
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
  bottom: 20%;
}
</style>
