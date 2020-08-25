import Vue from "vue";
import App from "./App.vue";
import search from "../packages/index";
import upload from "../packages/index";
import SearchDemo from "./pages/search-demo";
import UploadDemo from "./pages/upload-demo";

Vue.config.productionTip = false;
Vue.use(search);
Vue.use(upload);

const routes = [
  { path: "/search", component: SearchDemo },
  { path: "/upload", component: UploadDemo }
];
const router = new VueRouter({ routes });

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
