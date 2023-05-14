<template>
  <div class="cubes">
    <div class="sk-cube sk-cube1" :style="{ backgroundColor: color }" />
    <div class="sk-cube sk-cube2" :style="{ backgroundColor: color }" />
    <div class="sk-cube sk-cube3" :style="{ backgroundColor: color }" />
    <div class="sk-cube sk-cube4" :style="{ backgroundColor: color }" />
    <div class="sk-cube sk-cube5" :style="{ backgroundColor: color }" />
    <div class="sk-cube sk-cube6" :style="{ backgroundColor: color }" />
    <div class="sk-cube sk-cube7" :style="{ backgroundColor: color }" />
    <div class="sk-cube sk-cube8" :style="{ backgroundColor: color }" />
    <div class="sk-cube sk-cube9" :style="{ backgroundColor: color }" />
  </div>
</template>

<script>
export default {
  name: "SpinnerCube",
  props: {
    color: {
      type: String,
      default: "#ebebeb"
    }
  }
};
</script>

<style lang="scss" scoped>
.cubes {
  width: 40px;
  height: 40px;
  margin: 100px auto;
  font-size: 0;

  .sk-cube {
    width: 33%;
    padding-top: 33%;
    display: inline-block;
    animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  }

  .sk-cube1 {
    animation-delay: 0.2s;
  }

  .sk-cube2 {
    animation-delay: 0.3s;
  }

  .sk-cube3 {
    animation-delay: 0.4s;
  }

  .sk-cube4 {
    animation-delay: 0.1s;
  }

  .sk-cube5 {
    animation-delay: 0.2s;
  }

  .sk-cube6 {
    animation-delay: 0.3s;
  }

  .sk-cube7 {
    animation-delay: 0s;
  }

  .sk-cube8 {
    animation-delay: 0.1s;
  }

  .sk-cube9 {
    animation-delay: 0.2s;
  }
}

@keyframes sk-cubeGridScaleDelay {
  0%,
  70%,
  100% {
    transform: scale3D(1, 1, 1);
  }
  35% {
    transform: scale3D(0, 0, 1);
  }
}
</style>
