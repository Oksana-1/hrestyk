<template>
  <div class="about-us-section waypoint">
    <div class="about-img-fix animate opacity">
      <div
        class="about-img"
        :style="
          { backgroundImage : `url('${require('../../assets/images/about-img.jpg')}')` }"
      />
      <div class="about-content-cont">
        <div class="title-big">
          Наша історія
        </div>
        <router-link
          :to="'/about'"
          class="hrestyk-btn-light hrestyk-btn-200"
        >
          <span>
            {{ btnText.more }}
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import { btnText } from "@/entities/data/btnTexts";

  export default {
    data() {
      return {
        btnText
      }
    }
  }
</script>