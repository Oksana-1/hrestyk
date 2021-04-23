<template>
  <div class="delivery-content hr-content">
    <div class="delivery-content-block">
      <div class="c-box-1100">
        <div class="delivery-content-title">
          {{ deliveryTexts.termTitle }}
        </div>
        <div
          class="delivery-content-text"
          v-html="deliveryTexts.termText"
        />
      </div>
    </div>
    <div class="delivery-content-block">
      <div class="c-box-1100">
        <div class="delivery-content-title">
          {{ deliveryTexts.paymentTitle }}
        </div>
        <div
          class="delivery-content-text"
          v-html="deliveryTexts.paymentText"
        />
      </div>
    </div>
    <div class="delivery-content-block">
      <div class="c-box-1100">
        <div class="delivery-content-title">
          {{ deliveryTexts.deliveryTitle }}
        </div>
        <div
          class="delivery-content-text"
          v-html="deliveryTexts.deliveryText"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { deliveryTexts } from "@/entities/data/deliveryText";

export default {
  data() {
    return {
      deliveryTexts,
    };
  },
};
</script>
