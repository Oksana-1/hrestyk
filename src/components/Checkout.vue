<template>
  <div class="checkout-content hr-content">
    <div class="catalog-category-section">
      <div class="c-box-1100">
        <div class="catalog-category-container">
          <h1 class="common-title">
            {{ headerTexts.checkout }}
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
                {{ noteTexts.beforeFormNote }}
              </div>
              <form :class="{ 'form-disabled': cartProducts.length < 1 }">
                <div
                  class="input-row"
                  :class="{ invalid: $v.name.$error }"
                >
                  <label>
                    <input
                      v-model="name"
                      type="text"
                      :placeholder="placeHolders.name"
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
                      :placeholder="placeHolders.email"
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
                      :placeholder="placeHolders.phone"
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
                      :placeholder="placeHolders.message"
                    />
                  </label>
                </div>
                <div class="input-row">
                  <button
                    type="submit"
                    :disabled="cartProducts.length < 1 || busy"
                    @click.prevent="submitOrder"
                  >
                    {{ btnText.send }}
                  </button>
                </div>
              </form>
            </div>
            <div class="checkout-links-wrap">
              <router-link to="/delivery">
                {{ noteTexts.paymentAndDeliveryNote }}
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
import { mapActions, mapGetters } from "vuex";
import Order, { ProcessingStatus, UserInfo } from "@/entities/Order";
import { btnText } from "@/entities/data/btnTexts";
import { headerTexts, noteTexts } from "@/entities/data/texts";
import { placeHolders } from "@/entities/data/placeHolders";
import { formErrors } from "@/entities/data/errorTexts";

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
      formErrors,
      submitStatus: null,
      busy: false,
      btnText,
      headerTexts,
      noteTexts,
      placeHolders,
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
    ...mapGetters(["cartProducts"]),
    userInfoObject() {
      return new UserInfo({
        name: this.name,
        email: this.email,
        phone: this.phone,
      });
    },
    processingStatusObject() {
      return new ProcessingStatus({
        processingStatus: "ordered",
        content: "Order sent by customer",
      });
    },
    getOrderObject() {
      return new Order({
        userInfo: this.userInfoObject,
        products: this.cartProducts,
        processing: [this.processingStatusObject],
        orderStatus: "ordered",
      });
    },
  },
  methods: {
    ...mapActions(["setCartToLocalStorage", "addToCart"]),
    async submitOrder() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.busy = false;
        try {
          await this.addToCart(this.getOrderObject)
          this.setCartToLocalStorage([]);
          await this.$router.push("thankyou");
        } catch (e) {
          console.error(e);
          this.busy = true;
        }
      }
    },
  },
};
</script>
