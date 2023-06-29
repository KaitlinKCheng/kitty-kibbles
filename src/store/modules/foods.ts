import { ActionContext } from "vuex";

import State from "@/store/states/State";
import FoodsState from "@/store/states/FoodsState";

import Food from "@/ts/classes/Food";
import { FOOD_STOCK_KEY } from "@/ts/constants";

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
         * Initializes the foodStock by retrieving data stored in localStorage.
         * @param {ActionContext<FoodsState, State>} context - properties of the module
         */
        init(context: ActionContext<FoodsState, State>): void {
            const lsFoodStock = localStorage.getItem(FOOD_STOCK_KEY);
            if (lsFoodStock !== null) {
                context.commit("setFoodStock", new Map(JSON.parse(lsFoodStock)));
            }
        },
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
                context.dispatch("updateLocalStorageFoodStock");
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
                context.dispatch("updateLocalStorageFoodStock");
                success = true;
            }

            return success;
        },
        /**
         * Increments the count property of a @see Food.
         * @param {ActionContext<FoodsState, State>} context - properties of the module
         * @param {{ id: string, add: number }} payload - contains the @see Food id and amount to increment
         */
        incrementStock(context: ActionContext<FoodsState, State>,
                payload: { id: string, add: number }): void {
            const food = context.state.foodStock.get(payload.id);
            if (food !== undefined) {
                food.count = Number(food.count) + Number(payload.add);
            }

            context.dispatch("updateLocalStorageFoodStock");
        },
        /**
         * Decrements the count property of a @see Food.
         * @param {ActionContext<FoodsState, State>} context - properties of the module
         * @param {{ id: string, sub: number }} payload - contains the @see Food id and amount to decrement
         */
        decrementStock(context: ActionContext<FoodsState, State>,
                payload: { id: string, sub: number }): void {
            const food = context.state.foodStock.get(payload.id);
            if (food !== undefined) {
                food.count = Number(food.count) - Number(payload.sub);
            }

            context.dispatch("updateLocalStorageFoodStock");
        },
        /**
         * Stores the current foodStock in localStorage.
         * @param {ActionContext<FoodsState, State>} context - properties of the module
         */
        updateLocalStorageFoodStock(context: ActionContext<FoodsState, State>): void {
            localStorage.setItem(FOOD_STOCK_KEY, JSON.stringify([...context.state.foodStock]));
        }
    }
}
