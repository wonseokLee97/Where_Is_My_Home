<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Where is my home</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/board">Q&A</b-nav-item>
          <b-nav-item href="/about">About</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "HeaderNav",
};
</script>

<style>
.navbar.navbar-dark.bg-dark {
  background-color: #423d3d59 !important;
}
.navbar-brand {
  font-size: xx-large !important;
}
</style>
