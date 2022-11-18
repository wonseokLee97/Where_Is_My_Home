<template>
  <div>
    <!-- Start Top Header Bar -->
    <section class="top-header">
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-xs-12 col-sm-4">
            <div class="contact-number">
              <i class="tf-ion-ios-telephone"></i>
              <span>0129- 12323-123123</span>
            </div>
          </div>
          <div class="col-md-4 col-xs-12 col-sm-4">
            <!-- Site Logo -->
            <div class="logo text-center">
              <a href="index.html">
                <!-- replace logo here -->
                <svg
                  width="400px"
                  height="29px"
                  viewBox="0 0 155 40"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <g
                    id="Page-1"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                    font-size="40"
                    font-family="AustinBold, Austin"
                    font-weight="bold"
                  >
                    <g id="Group" transform="translate(-108.000000, -297.000000)" fill="#000000">
                      <text id="AVIATO">
                        <tspan x="108.94" y="325">Happy House</tspan>
                      </text>
                    </g>
                  </g>
                </svg>
              </a>
            </div>
          </div>
          <div class="col-md-4 col-xs-12 col-sm-4">
            <ul class="top-menu text-right list-inline">
              <!-- Search -->
              <li class="dropdown search dropdown-slide">
                <a href="#!" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
                  ><i class="tf-ion-ios-search-strong"></i> Search</a
                >
                <ul class="dropdown-menu search-dropdown">
                  <li>
                    <form action="post">
                      <input type="search" class="form-control" placeholder="Search..." />
                    </form>
                  </li>
                </ul>
              </li>
              <!-- / Search -->
            </ul>
            <!-- / .nav .navbar-nav .navbar-right -->
          </div>
        </div>
      </div>
    </section>
    <!-- End Top Header Bar -->

    <!-- Main Menu Section -->
    <section class="menu">
      <nav class="navbar navigation">
        <di class="container">
          <div class="navbar-header">
            <h2 class="menu-title">Main Menu</h2>
            <button
              type="button"
              class="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <!-- / .navbar-header -->

          <!-- Navbar Links -->
          <div id="navbar" class="navbar-collapse collapse text-center">
            <ul class="nav navbar-nav">
              <!-- Home -->
              <li class="dropdown">
                <a href="index.html">Home</a>
              </li>
              <!-- / Home -->
              <!-- Element -->
              <li class="dropdown dropdown-slide">
                <a
                  href="#!"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  data-hover="dropdown"
                  data-delay="350"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  >Elements <span class="tf-ion-ios-arrow-down"></span
                ></a>
                <ul class="dropdown-menu">
                  <li><a href="typography.html">Typography</a></li>
                  <li><a href="buttons.html">Buttons</a></li>
                  <li><a href="alerts.html">Alerts</a></li>
                </ul>
              </li>
              <!-- / Element -->
            </ul>
            <!-- / .nav .navbar-nav -->
          </div>
          <!--/.navbar-collapse -->
        </di>
        <!-- / .container -->
      </nav>
    </section>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">Where is my home</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/board">Q&A</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
          <b-nav-item to="#" v-if="getUser" @click="logout">Logout</b-nav-item>
          <b-nav-item to="/login" v-else>Login</b-nav-item>
          <span>{{ userid }}</span>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HeaderNav",
  methods: {
    logout() {
      // mutation 호출
      console.log("logout");
      this.$store.commit("LOGOUT");
    },
  },
  computed: {
    ...mapState({
      userid: (state) => state.member.userid,
    }),
    getUser() {
      if (this.userid) {
        return true;
      } else {
        return false;
      }
    },
  },
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
