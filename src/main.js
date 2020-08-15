import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from 'axios'
Vue.prototype.$http = axios
import Swal from 'sweetalert2'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
/*
import AxiosPlugin from 'vue-axios-cors';

Vue.use(AxiosPlugin)*/

Vue.config.productionTip = false;

Vue.prototype.$swal = Swal

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");