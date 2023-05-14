<template>
  <div class="error-container">
    <icon-base
      icon-name="warning"
      view-box="-0.5 0 25 25"
      width="75"
      height="75"
      icon-color="transparent"
    >
      <icon-warning />
    </icon-base>
    <p class="error-text">
      {{ error.message }}
    </p>
  </div>
</template>

<script>
import IconBase from "@/components/IconBase";
import IconWarning from "@/components/icons/IconWarning";

export default {
  name: "ErrorBlock",
  props: {
    error: Error
  },
  components: {
    IconBase,
    IconWarning
  }
};
</script>

<style scoped></style>
