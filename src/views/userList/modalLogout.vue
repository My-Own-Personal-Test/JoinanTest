<template>
  <b-modal
    id="modalLogout"
    title="Warning!"
    centered
    header-bg-variant="danger"
    header-text-variant="light"
  >
    <p class="my-4">{{ `Do you want to logout?` }}</p>

    <template #modal-footer>
      <b-button
        size="sm"
        variant="secondary"
        style="width: 80px"
        @click="$bvModal.hide('modalLogout')"
      >
        Cancel
      </b-button>
      <b-button
        :disabled="loading"
        size="sm"
        style="width: 80px"
        variant="danger"
        @click="logout"
      >
        <span v-if="!loading">Yes</span>
        <Spinner v-else />
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.replace("/");
    },
  },
};
</script>
