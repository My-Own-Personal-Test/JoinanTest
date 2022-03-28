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

          <b-button
            :disabled="loading"
            variant="primary"
            @click="$router.push('/userLists')"
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
export default {
  data() {
    return {
      loading: false,
      data: {
        username: "",
        password: "",
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
</style>
