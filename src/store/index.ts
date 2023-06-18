import Vue from "vue";
import Vuex from "vuex";

import State from "@/store/states/State";
import foods from "@/store/modules/foods";

Vue.use(Vuex);

export default new Vuex.Store<State>({
    modules: {
        foods: foods
    }
});
