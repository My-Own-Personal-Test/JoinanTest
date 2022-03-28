<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form-group
          id="username-input"
          label="Username :"
          label-for="username-input"
        >
          <b-form-input
            id="username-input"
            type="text"
            placeholder="Username..."
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
            placeholder="password..."
          ></b-form-input>
        </b-form-group>

        <b-button variant="primary">
          <span>Login</span>
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src

export default {};
</script>
