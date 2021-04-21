<template>
  <div class="about-content hr-content">
    <div class="about-top-img-fix">
      <div
        class="about-top-img"
        :style="{
          backgroundImage: `url('${require('../assets/images/about-img.jpg')}')`,
        }"
      />
      <div class="about-top-text">
        <div class="about-top-text-inner">
          <h1 class="about-title">
            {{ aboutUsTitles.zero }}
          </h1>
          <div
            class="editor-content"
            v-html="aboutUsTexts.zero"
          />
        </div>
      </div>
    </div>
    <div class="about-section waypoint">
      <div class="c-box-1100">
        <div class="c-cont">
          <div class="col-50 animate opacity from-left">
            <div class="traditional-img-fix">
              <img
                :src="require('../assets/images/traditional.jpg')"
                alt="Традиції і сучасність у вишивці"
                class="fits"
              >
            </div>
          </div>
          <div class="col-50 traditional-text animate opacity">
            <h2 class="common-title">
              {{ aboutUsTitles.first }}
            </h2>
            <div
              class="editor-content"
              v-html="aboutUsTexts.first"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="goods-section waypoint">
      <div class="c-box-1100">
        <div class="c-cont">
          <div class="col-50 goods-text-col animate opacity">
            <h2 class="common-title">
              {{ aboutUsTitles.second }}
            </h2>
            <div
              class="editor-content"
              v-html="aboutUsTexts.second"
            />
          </div>
        </div>
      </div>
      <div class="goods-img-fix animate opacity from-right">
        <div
          class="goods-img"
          :style="{
            backgroundImage: `url('${require('../assets/images/product.jpg')}')`,
          }"
        />
      </div>
    </div>
  </div>
</template>
<script>
import {aboutUsTitles, aboutUsTexts} from "@/entities/data/aboutUsTexts";

export default {
  data() {
    return {
      aboutUsTitles,
      aboutUsTexts
    }
  },
  methods: {
    initWaypoint() {
      const waypointElements = document.querySelectorAll(".waypoint");
      waypointElements.forEach((waypointElement) => {
        new Waypoint({
          element: waypointElement,
          handler: function () {
            waypointElement.classList.add("waypoint-done");
          },
          offset: "80%",
        });
      });
    },
  },
  mounted() {
    this.initWaypoint();
  }
};
</script>
