<template>
  <nav class="sticky navbar navbar-expand-md">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link" href="#home"><b-icon icon="arrow-up-square" /></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#loadview">로드뷰</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#info">아파트정보</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#store">상권정보</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#list">거래내역</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.sticky {
  position: sticky;
  top: 0px;
  z-index: 10;
}
.navbar {
  font-size: 13px;
}
</style>
