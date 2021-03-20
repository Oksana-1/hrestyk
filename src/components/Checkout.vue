<template>
  <div class="checkout-content hr-content">
    <div class="catalog-category-section">
      <div class="c-box-1100">
        <div class="catalog-category-container">
          <h1 class="common-title">
            Оформлення замовлення
          </h1>
        </div>
      </div>
    </div>
    <div class="checkout-section">
      <div class="c-box-1100">
        <div class="c-cont">
          <div class="col-50 col-form">
            <div class="styled-form white-bkgnd-form styled-form-400">
              <div class="cart-note">
                Будь ласка, заповніть форму, і наш менеджер зконтактує з Вами
                найближчого часу.
              </div>
              <form :class="{ 'form-disabled': cart.length < 1 }">
                <div
                  class="input-row"
                  :class="{ invalid: $v.name.$error }"
                >
                  <label>
                    <input
                      v-model="name"
                      type="text"
                      placeholder="Ваше ім'я"
                      @blur="$v.name.$touch()"
                    >
                  </label>
                  <p
                    v-if="!$v.name.required && $v.name.$dirty"
                    class="invalid-message"
                  >
                    {{ formErrors.empty }}
                  </p>
                </div>
                <div
                  class="input-row"
                  :class="{ invalid: $v.email.$error }"
                >
                  <label>
                    <input
                      v-model="email"
                      type="text"
                      placeholder="Ваш email"
                      @blur="$v.email.$touch()"
                    >
                  </label>
                  <p
                    v-if="!$v.email.email"
                    class="invalid-message"
                  >
                    {{ formErrors.invalidEmail }}
                  </p>
                  <p
                    v-if="!$v.email.required && $v.email.$dirty"
                    class="invalid-message"
                  >
                    {{ formErrors.empty }}
                  </p>
                </div>
                <div
                  class="input-row"
                  :class="{ invalid: $v.phone.$error }"
                >
                  <label>
                    <input
                      v-model="phone"
                      type="text"
                      placeholder="Ваш телефон"
                      @blur="$v.phone.$touch()"
                    >
                  </label>
                  <p
                    v-if="!$v.phone.numeric || !$v.phone.minLength"
                    class="invalid-message"
                  >
                    {{ formErrors.invalidPhonel }}
                  </p>
                  <p
                    v-if="!$v.phone.required && $v.phone.$dirty"
                    class="invalid-message"
                  >
                    {{ formErrors.empty }}
                  </p>
                </div>
                <div class="input-row">
                  <label>
                    <textarea
                      v-model="message"
                      placeholder="Ваші коментарі"
                    />
                  </label>
                </div>
                <div class="input-row">
                  <button
                    type="submit"
                    :disabled="cart.length < 1"
                    @click.prevent="$v.$touch()"
                  >
                    Відправити
                  </button>
                </div>
              </form>
            </div>
            <div class="checkout-links-wrap">
              <router-link to="/delivery">
                Умови оплати і доставки
              </router-link>
            </div>
          </div>
          <checkout-cart />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, email, numeric, minLength } from "vuelidate/lib/validators";
import CheckoutCart from "@/components/checkout/CheckoutCart";
import {mapGetters} from "vuex";

export default {
  components: {
    CheckoutCart,
  },
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      message: "",
      formErrors: {
        invalidEmail: "Будь-ласка, введіть корректний email.",
        invalidPhonel: "Будь-ласка, введіть корректний телефон",
        empty: "Це поле обов'язкове.",
      },
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    phone: {
      required,
      numeric,
      minLength: minLength(10),
    },
    name: {
      required,
    },
  },
  computed: {
    ...mapGetters(['cart']),
  }
};
</script>
