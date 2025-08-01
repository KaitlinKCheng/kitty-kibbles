import { ActionContext } from "vuex";

import State from "@/store/states/State";
import FoodsState from "@/store/states/FoodsState";

import Food from "@/ts/classes/Food";
import { FOOD_INVALID_ID, FOOD_STOCK_KEY, FOOD_ID_KEY } from "@/ts/constants";

export default {
    namespaced: true,

    state: (): FoodsState => ({
        foodStock: new Map<number, Food>(), // All the types of food available
        nextFoodId: 0 // Next ID to assign to a new Food object
    }),

    getters: {
        foodStock: (state: FoodsState) => (): Map<number, Food> => {
            return state.foodStock;
        }
    },

    mutations: {
        setFoodStock(state: FoodsState, payload: Map<number, Food>): void {
            state.foodStock = payload;
        },
        setNextFoodId(state: FoodsState, payload: number): void {
            state.nextFoodId = payload;
        },
        addFood(state: FoodsState, payload: { key: number, value: Food }): void {
            state.foodStock.set(payload.key, payload.value);
        },
        removeFood(state: FoodsState, payload: number): void {
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

            const lsFoodId = localStorage.getItem(FOOD_ID_KEY);
            if (lsFoodId !== null) {
                context.commit("setNextFoodId", JSON.parse(lsFoodId));
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

            // Assign an ID to newly created Food objects
            if (payload.id === FOOD_INVALID_ID) {
                payload.id = context.state.nextFoodId;
                context.state.nextFoodId++;
                context.dispatch("updateLocalStorageFoodId");
            }

            if (!context.state.foodStock.has(payload.id)) {
                context.commit("addFood", { key: payload.id, value: payload });
                context.dispatch("updateLocalStorageFoodStock");
                success = true;
            }

            return success;
        },
        /**
         * Updates a @see Food object in the foodStock.
         * @param {ActionContext<FoodsState, State>} context - properties of the module
         * @param {Food} payload - the @see Food to update
         * @return {boolean} - success result
         */
        updateFood(context: ActionContext<FoodsState, State>, payload: Food): boolean {
            let success = false;

            if (context.state.foodStock.has(payload.id)) {
                context.commit("addFood", { key: payload.id, value: payload });
                context.dispatch("updateLocalStorageFoodStock");
                success = true;
            }

            return success;
        },
        /**
         * Removes a @see Food object from the foodStock.
         * @param {ActionContext<FoodsState, State>} context - properties of the module
         * @param {number} payload - the id of the @see Food object to remove
         * @return {boolean} - success result
         */
        removeFood(context: ActionContext<FoodsState, State>, payload: number): boolean {
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
         * @param {{ id: number, add: number }} payload - contains the @see Food id and amount to increment
         */
        incrementStock(context: ActionContext<FoodsState, State>,
                payload: { id: number, add: number }): void {
            const food = context.state.foodStock.get(payload.id);
            if (food !== undefined) {
                food.count = Number(food.count) + Number(payload.add);
            }

            context.dispatch("updateLocalStorageFoodStock");
        },
        /**
         * Decrements the count property of a @see Food.
         * @param {ActionContext<FoodsState, State>} context - properties of the module
         * @param {{ id: number, sub: number }} payload - contains the @see Food id and amount to decrement
         */
        decrementStock(context: ActionContext<FoodsState, State>,
                payload: { id: number, sub: number }): void {
            const food = context.state.foodStock.get(payload.id);
            if (food !== undefined) {
                food.count = Number(food.count) - Number(payload.sub);
            }

            context.dispatch("updateLocalStorageFoodStock");
        },
        /**
         * Updates the current foodStock.
         * @param {ActionContext<FoodsState, State>} context - properties of the module
         * @param {Map<number, Food>} payload - the new foodStock
         */
        updateFoodStock(context: ActionContext<FoodsState, State>,
                payload: Map<number, Food>): void {
            context.commit("setFoodStock", payload);
            context.dispatch("updateLocalStorageFoodStock");
        },
        /**
         * Stores the current foodStock in localStorage.
         * @param {ActionContext<FoodsState, State>} context - properties of the module
         */
        updateLocalStorageFoodStock(context: ActionContext<FoodsState, State>): void {
            localStorage.setItem(FOOD_STOCK_KEY, JSON.stringify([...context.state.foodStock]));
        },
        /**
         * Stores the current nextFoodId in localStorage.
         * @param {ActionContext<FoodsState, State>} context - properties of the module
         */
        updateLocalStorageFoodId(context: ActionContext<FoodsState, State>): void {
            localStorage.setItem(FOOD_ID_KEY, JSON.stringify(context.state.nextFoodId));
        }
    }
}
