<template>
  <div class="home">
    <div class="box">
      <b-row>
        <b-col md="4">
          <img :src="require('@/assets/house.png')" width="100%" />
          <div>아파트 정보</div>
        </b-col>
        <b-col md="4">
          <img :src="require('@/assets/board.png')" width="100%" />
          <div>자유게시판</div>
        </b-col>
        <b-col md="4">
          <img :src="require('@/assets/heart.png')" width="100%" />
          <div>관심 아파트</div>
        </b-col>
      </b-row>
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
      <!-- <b-carousel-slide :img-src="require('@/assets/main2.jpg')"></b-carousel-slide> -->
    </b-carousel>
  </div>
</template>

<script></script>

<style scoped>
.box {
  position: absolute;
  z-index: 5;
  top: 300px;
  left: 21%;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.45);
  background-color: white;
  width: 60vw;
  height: 50vh;
  padding: 10px;
}
</style>
