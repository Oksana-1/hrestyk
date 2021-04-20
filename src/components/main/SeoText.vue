<template>
  <div class="about-text-section waypoint">
    <div class="c-box-1100">
      <div class="common-title animate opacity">
        {{ seoTexts.title }}
      </div>
      <div
        class="about-text-container animate opacity"
        v-html="seoTexts.content"
      />
    </div>
  </div>
</template>
<script>
import { seoTexts } from "@/entities/data/seoTexts";
export default {
  data() {
    return {
      seoTexts,
    };
  },
};
</script>
