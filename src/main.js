import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from "vue-router";
import {routes} from "@/routes";
import {store} from "./store/store"
/*import VSlider from "vuetify/src/components/VSlider";*/

Vue.config.productionTip = false

Vue.use(VueRouter);
/*Vue.use(VSlider);*/

const router = new VueRouter({
    routes,
    mode: "history"  ///#/user historyi tanımlamazsak bu şekilde route ediyor
});

new Vue({
  vuetify,
    router,
    store,
  render: h => h(App)
}).$mount('#app')

