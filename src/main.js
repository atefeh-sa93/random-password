import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueGtag from "vue-gtag";

Vue.use(VueGtag, {
  config: { id: "G-0HLF8N6CR5" },
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
