<template>
  <div class="hr-footer">
    <div class="c-box-1100 footer-content">
      <div class="footer-contact-block">
        <div class="styled-form">
          <form>
            <div
              class="input-row"
              :class="{ invalid: $v.name.$error }"
            >
              <input
                v-model="name"
                type="text"
                :placeholder="placeHolders.name"
                @blur="$v.name.$touch()"
              >
            </div>
            <div
              class="input-row"
              :class="{ invalid: $v.phone.$error }"
            >
              <input
                v-model="phone"
                type="text"
                :placeholder="placeHolders.phone"
                @blur="$v.phone.$touch()"
              >
            </div>
            <div class="input-row">
              <textarea
                v-model="message"
                :placeholder="placeHolders.message"
              />
            </div>
            <div class="input-row">
              <button
                type="submit"
                @click.prevent="submit"
              >
                {{ btnText.send }}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="footer-logo-block">
        <div
          class="logo-fix"
          @click="navigateToHome()"
        >
          <img
            class="fits"
            src="../assets/images/logo.png"
            alt="Logo"
          >
        </div>
        <div class="social-cont">
          <a
            :href="social.fb"
            class="social-link"
          >
            <icon-base icon-name="fb">
              <icon-fb />
            </icon-base>
          </a>
          <a
            :href="social.ig"
            class="social-link"
          >
            <icon-base icon-name="ig">
              <icon-ig />
            </icon-base>
          </a>
          <a
            :href="social.twitter"
            class="social-link"
          >
            <icon-base icon-name="twitter">
              <icon-twitter />
            </icon-base>
          </a>
        </div>
      </div>
      <div class="footer-nav-block">
        <nav class="footer-nav">
          <ul>
            <li>
              <router-link to="/">
                {{ menu.main }}
              </router-link>
            </li>
            <li>
              <router-link to="/catalog">
                {{ menu.catalog }}
              </router-link>
            </li>
            <li>
              <router-link to="/about">
                {{ menu.about }}
              </router-link>
            </li>
            <li>
              <router-link to="/delivery">
                {{ menu.delivery }}
              </router-link>
            </li>
          </ul>
        </nav>
        <div class="footer-contact-container">
          <a
            :href="`mailto:${contacts.email}`"
            class="contact-link"
          >
            <icon-base
              icon-name="email"
              view-box="0 0 382 382"
              width="15"
              height="15"
            >
              <icon-email />
            </icon-base>
            <div class="contact-text">{{ contacts.email }}</div>
          </a>
          <a
            :href="`tel:${contacts.phone}`"
            class="contact-link"
          >
            <icon-base
              icon-name="phone"
              view-box="0 0 348 348"
              width="15"
              height="15"
            >
              <icon-phone />
            </icon-base>
            <div class="contact-text">{{ contacts.phoneDisplay }}</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import IconBase from "../components/IconBase.vue";
import IconFb from "../components/icons/IconFb.vue";
import IconIg from "../components/icons/IconIg.vue";
import IconTwitter from "../components/icons/IconTwitter.vue";
import IconPhone from "../components/icons/IconPhone.vue";
import IconEmail from "../components/icons/IconEmail.vue";
import { required, numeric, minLength } from "vuelidate/lib/validators";
import { btnText } from "@/entities/data/btnTexts";
import { menu } from "@/entities/data/navigation";
import { social } from "@/entities/data/socialLinks";
import { contacts } from "@/entities/data/contacts";
import { placeHolders } from "@/entities/data/placeHolders";

export default {
  data() {
    return {
      name: "",
      phone: "",
      message: "",
      btnText,
      menu,
      social,
      contacts,
      placeHolders
    };
  },
  components: {
    IconBase,
    IconFb,
    IconIg,
    IconTwitter,
    IconPhone,
    IconEmail
  },
  validations: {
    phone: {
      required,
      numeric,
      minLength: minLength(10)
    },
    name: {
      required
    }
  },
  methods: {
    ...mapMutations(["SEND_FORM"]),
    navigateToHome() {
      this.$router.push({ path: "/" });
    },
    sendForm() {
      const footerFormData = {
        name: this.name,
        phone: this.phone,
        message: this.message
      };
      this.SEND_FORM(footerFormData);
    },
    submit() {
      this.sendForm();
      this.$v.$touch();
    }
  }
};
</script>
