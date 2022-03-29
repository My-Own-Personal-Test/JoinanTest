<template>
  <b-modal
    id="modalDelete"
    title="Warning!"
    centered
    header-bg-variant="danger"
    header-text-variant="light"
  >
    <p class="my-4">{{ `Are you sure want to delete user ${data.nama}?` }}</p>

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
        @click="deleteUser"
      >
        <span v-if="!loading">Delete</span>
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
    };
  },
  methods: {
    async deleteUser() {
      let vm = this;
      vm.loading = true;

      try {
        let deleteRes = await axios.post(
          "user/delete",
          { id: vm.data.id },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (deleteRes.data.message === "sukses") {
          vm.$emit("alertFromChild", {
            msg: "Delete Account Succeeded!",
            variant: "success",
            show: true,
          });
          vm.loading = false;
          vm.$bvModal.hide("modalDelete");
        } else {
          vm.$emit("alertFromChild", {
            msg: lodash.toUpper(deleteRes.data.message),
            variant: "danger",
            show: true,
          });
          vm.loading = false;
        }
      } catch (error) {
        vm.$emit("alertFromChild", {
          msg: error.message,
          variant: "danger",
          show: true,
        });
        vm.loading = false;
      }
    },
  },
};
</script>

<style></style>
