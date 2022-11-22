<template>
  <nav class="sticky navbar navbar-expand-md">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link" href="#home"><b-icon icon="arrow-up-square" /></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#loadview">loadview</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#info">info</a>
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

<style>
.sticky {
  position: sticky;
  top: 0px;
  z-index: 10;
}
.navbar {
  font-size: 13px;
}
</style>
