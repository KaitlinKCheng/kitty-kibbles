import Vue from "vue";
import Vuex from "vuex";

import foods from "@/store/modules/foods";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        foods,
    }
});
