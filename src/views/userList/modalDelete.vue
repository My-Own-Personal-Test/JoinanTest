<template>
  <b-modal
    id="modalDelete"
    title="Warning!"
    centered
    header-bg-variant="danger"
    header-text-variant="light"
  >
    <p class="my-4">{{ `Are you sure want to delete user ${user}!` }}</p>

    <template #modal-footer>
      <b-button
        size="sm"
        variant="secondary"
        style="width: 80px"
        @click="$bvModal.hide('modalDelete')"
      >
        Cancel
      </b-button>
      <b-button
        :disabled="loading"
        size="sm"
        style="width: 80px"
        variant="danger"
        @click="ok"
      >
        <span v-if="!loading">Delete</span>
        <Spinner v-else />
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    user: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ok() {
      console.log("asu");
    },
  },
};
</script>

<style></style>
