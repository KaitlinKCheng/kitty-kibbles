import { ActionContext } from "vuex";

import State from "@/store/states/State";
import FoodsState from "@/store/states/FoodsState";

import Food from "@/classes/Food";

export default {
    namespaced: true,

    state: (): FoodsState => ({
        foodStock: new Map<string, Food>() // All the types of food available
    }),

    getters: {
        foodStock: (state: FoodsState) => (): Map<string, Food> => {
            return state.foodStock;
        }
    },

    mutations: {
        setFoodStock(state: FoodsState, payload: Map<string, Food>): void {
            state.foodStock = payload;
        },
        addFood(state: FoodsState, payload: { key: string, value: Food }): void {
            state.foodStock.set(payload.key, payload.value);
        },
        removeFood(state: FoodsState, payload: string): void {
            state.foodStock.delete(payload);
        },
    },

    actions: {
        /**
         * Adds a @see Food object to the foodStock.
         * @param {ActionContext<FoodsState, State>} context - properties of the module
         * @param {Food} payload - the @see Food to add
         * @return {boolean} - success result
         */
        addFood(context: ActionContext<FoodsState, State>, payload: Food): boolean {
            let success = false;

            if (!context.state.foodStock.has(payload.id)) {
                context.commit("addFood", { key: payload.id, value: payload });
                success = true;
            }

            return success;
        },
        /**
         * Removes a @see Food object from the foodStock.
         * @param {ActionContext<FoodsState, State>} context - properties of the module
         * @param {string} payload - the id of the @see Food object to remove
         * @return {boolean} - success result
         */
        removeFood(context: ActionContext<FoodsState, State>, payload: string): boolean {
            let success = false;

            if (context.state.foodStock.has(payload)) {
                context.commit("removeFood", payload);
                success = true;
            }

            return success;
        },
        incrementStock(context: ActionContext<FoodsState, State>,
                payload: { id: string, add: number }): void {
            const food = context.state.foodStock.get(payload.id);
            food?.addCount(payload.add);
        },
        decrementStock(context: ActionContext<FoodsState, State>,
                payload: { id: string, sub: number }): void {
            const food = context.state.foodStock.get(payload.id);
            food?.subCount(payload.sub);
        },
    }
}
