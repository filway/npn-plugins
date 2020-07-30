import search from "./src/main.vue";

search.install = function(Vue) {
  Vue.component(search.name, search);
};

export default search;
