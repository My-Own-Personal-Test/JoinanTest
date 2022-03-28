<template>
  <b-alert :variant="variant" :show="show" dismissible>{{ msg }}</b-alert>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
    },
    variant: {
      type: String,
    },
    msg: {
      type: String,
    },
  },
};
</script>

<style></style>
