import Vue from "vue";
import App from "./App.vue";
import search from "../packages/index";

Vue.config.productionTip = false;
Vue.use(search);

new Vue({
  render: h => h(App)
}).$mount("#app");
