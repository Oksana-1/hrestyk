<template>
  <div class="about-us-section waypoint">
    <div class="about-img-fix animate opacity">
      <div
        class="about-img"
        style="
          background-image: url('../../../src/assets/images/about-img.jpg');
        "
      ></div>
      <div class="about-content-cont">
        <div class="title-big">Наша історія</div>
        <router-link :to="'/about'" class="hrestyk-btn-light hrestyk-btn-200"
          ><span>Докладніше</span></router-link
        >
      </div>
    </div>
  </div>
</template>