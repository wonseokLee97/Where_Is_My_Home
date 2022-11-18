import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/api/vueBootstrap.js";

import "@/assets/plugins/themefisher-font/style.css";
import "@/assets/plugins/bootstrap/css/bootstrap.min.css";

import "@/assets/plugins/animate/animate.css";
import "@/assets/plugins/slick/slick.css";
import "@/assets/plugins/slick/slick-theme.css";
import "@/assets/css/style.css";

// import "@/assets/plugins/jquery/dist/jquery.min.js";
// import "@/assets/plugins/bootstrap/js/bootstrap.min.js";
// import "@/assets/plugins/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js";
// import "@/assets/plugins/instafeed/instafeed.min.js";
// import "@/assets/plugins/ekko-lightbox/dist/ekko-lightbox.min.js";
// import "@/assets/plugins/syo-timer/build/jquery.syotimer.min.js";
// import "@/assets/plugins/slick/slick.min.js";
// import "@/assets/plugins/slick/slick-animation.min.js";
// import "@/assets/js/script.js";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
2;
