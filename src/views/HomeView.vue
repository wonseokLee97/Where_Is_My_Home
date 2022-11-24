<template>
  <div class="home">
    <div class="box"></div>
    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      indicators
      img-width="1024"
      img-height="480"
    >
      <b-carousel-slide :img-src="require('@/assets/main.jpg')"></b-carousel-slide>
      <!-- <b-carousel-slide :img-src="require('@/assets/main2.jpg')"></b-carousel-slide> -->
    </b-carousel>
  </div>
</template>

<script></script>

<style scoped>
.box {
  position: absolute;
  z-index: 2;
  top: 300px;
  left: 21%;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.45);
  background-color: white;
  width: 60vw;
  height: 50vh;
}
</style>
