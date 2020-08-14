import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from 'axios'
import Swal from 'sweetalert2'

Vue.config.productionTip = false;
Vue.prototype.$http = axios
Vue.prototype.$swal = Swal

Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Origin'] = ['*', '192.168.0.117'];

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");