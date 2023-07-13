// Vue
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// BootstrapVue
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "@/assets/custom.scss";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCat, faPlus, faMinus, faTimes, faTrash, faPenToSquare, faCubes } from "@fortawesome/free-solid-svg-icons";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.component("fa-icon", FontAwesomeIcon);
library.add(faCat, faPlus, faMinus, faTimes, faTrash, faPenToSquare, faCubes);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
