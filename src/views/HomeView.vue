<template>
  <div class="home">
    <div class="logo">
      <h1>Where is my home</h1>
    </div>
    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      indicators
      img-width="1024"
      img-height="480"
    >
      <b-carousel-slide :img-src="require('@/assets/main.jpg')"></b-carousel-slide>
      <b-carousel-slide :img-src="require('@/assets/main2.jpg')"></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script></script>

<style scoped>
h1 {
  position: absolute;
  color: white;
  z-index: 5;
}
.logo {
  text-align: center;
}
</style>
