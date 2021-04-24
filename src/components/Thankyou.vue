<template>
  <div class="thankyou-content">
    <div class="catalog-category-section">
      <div class="c-box-1100">
        <div class="catalog-category-container">
          <h1 class="common-title">
            {{ thankYouText.orderedTitle }}
          </h1>
        </div>
      </div>
    </div>
    <div class="thankyou-section">
      <div class="c-box-1100">
        <div class="sep-line-img">
          <img
            class="fits"
            src="../assets/images/logo.png"
            alt="Logo"
          >
        </div>
        <div class="editor-content">
          <div v-html="thankYouText.orderedText" />
          <p>
            <a :href="`tel:${contacts.phone}`">{{ contacts.phoneDisplay }}</a>
          </p>
        </div>
        <div class="hrestyk-btn-wrap">
          <router-link
            to="/"
            class="hrestyk-btn-bordered-white"
          >
            <div class="link-abs" />
            <span>{{ btnText.backToMain }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { btnText } from "@/entities/data/btnTexts";
import { thankYouText } from "@/entities/data/thankYouText";
import { contacts } from "@/entities/data/contacts";

export default {
  data() {
    return {
      btnText,
      thankYouText,
      contacts,
    };
  },
};
</script>
