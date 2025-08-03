<template>
    <b-container>
        <b-col
            class="mt-3"
            align="center"
        >
            <b-button
                @click="[editing = false, showFoodForm()]"
                variant="secondary"
                size="lg"
            >
                <span>Add New Food</span>&nbsp;
                <fa-icon icon="fa-solid fa-plus" />
            </b-button>
        </b-col>
        <b-col
            class="mt-3"
            align="right"
        >
            <b-dropdown text="Sort By" :disabled="getFoodStock.size === 0">
                <b-dropdown-item
                    v-for="option in sortOptions"
                    :key="option.name"
                    @click="sort(option.sortFunc)"
                >{{ option.name }}</b-dropdown-item>
            </b-dropdown>
        </b-col>
        <b-row
            cols="1"
            cols-sm="2"
            cols-lg="3"
            align-h="center"
        >
            <b-col
                v-for="food in getFoodStock.values()"
                :key="food.id + food.brand + food.name + food.type + food.size + food.count"
                class="my-3"
            >
                <FoodPageItem
                    :display-food="food"
                    @edit-food="editFood(food)"
                    @delete-food="deleteFood(food)"
                />
            </b-col>
        </b-row>
        <FoodPageForm
            :food-item="currentFood"
            :editing="editing"
            @done-form="doneForm()"
        />
    </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import Food from "@/ts/classes/Food";
import FoodPageForm from "@/components/FoodPageForm.vue";
import FoodPageItem from "@/components/FoodPageItem.vue";
import _ from "lodash";

export default Vue.extend({
    name: "FoodPage",
    components: {
        FoodPageForm,
        FoodPageItem
    },

    created() {
        store.dispatch("foods/init");

        // Set up sort options
        let sortByDefault = {
            name: "Default",
            sortFunc: function(arr: Array<{ id: number; value: Food }>): Array<{ id: number; value: Food }> {
                    return _.sortBy(arr, [(entry: { id: number; value: Food }) => entry.id]);
            }
        };

        let sortByBrand = {
            name: "Brand",
            sortFunc: function(arr: Array<{ id: number; value: Food }>): Array<{ id: number; value: Food }> {
                    return _.sortBy(arr, [(entry: { id: number; value: Food }) => entry.value.brand.toLowerCase()]);
            }
        };

        let sortByName = {
            name: "Name",
            sortFunc: function(arr: Array<{ id: number; value: Food }>): Array<{ id: number; value: Food }> {
                    return _.sortBy(arr, [(entry: { id: number; value: Food }) => entry.value.name.toLowerCase()]);
            }
        };

        let sortByRemaining = {
            name: "# Remaining",
            sortFunc: function(arr: Array<{ id: number; value: Food }>): Array<{ id: number; value: Food }> {
                    return _.sortBy(arr, [(entry: { id: number; value: Food }) => +entry.value.count]);
            }
        };

        this.sortOptions.push(sortByDefault);
        this.sortOptions.push(sortByBrand);
        this.sortOptions.push(sortByName);
        this.sortOptions.push(sortByRemaining);
    },

    data() {
        return {
            currentFood: new Food(),
            editing: false,
            sortOptions: new Array<{
                name: string;
                sortFunc: (arr: Array<{ id: number; value: Food }>) => Array<{ id: number; value: Food }>
            }>()
        };
    },

    computed: {
        getFoodStock(): Map<number, Food> {
            return store.state.foods.foodStock;
        },
    },

    methods: {
        showFoodForm(): void {
            this.$bvModal.show("formModal");
        },
        doneForm(): void {
            this.$forceUpdate();

            if (this.editing) {
                this.toast("Food successfully updated.");
            } else {
                this.toast("Food successfully added.");
            }

            this.editing = false;
        },
        editFood(newFood: Food): void {
            this.currentFood = newFood;
            this.editing = true;
            this.showFoodForm();
        },
        deleteFood(foodItem: Food): void {
            this.$bvModal.msgBoxConfirm(
                `Are you sure you want to delete ${foodItem.brand} – ${foodItem.name}?`, {
                    title: 'Delete Food',
                    okVariant: 'danger',
                    cancelVariant: 'dark'
            }).then(confirm => {
                if (confirm) {
                    store.dispatch("foods/removeFood", foodItem.id);
                    this.$forceUpdate();

                    this.toast("Food successfully deleted.");
                }
            });
        },
        sort(sortFunc: (arr: Array<{ id: number; value: Food }>) => Array<{ id: number; value: Food }>): void {
            // Convert map to array for sorting
            let foodStockArray = Array.from(this.getFoodStock, ([id, value]) => ({id, value}));
            foodStockArray = sortFunc(foodStockArray);

            const newFoodStock = new Map(foodStockArray.map((entry) => [entry.id, entry.value]));

            store.dispatch("foods/updateFoodStock", newFoodStock);
        },
        toast(msg: string): void {
            this.$bvToast.toast(msg, {
                title: "Kitty Kibbles",
                toaster: "b-toaster-bottom-center",
                isStatus: true
            });
        }
    }
});
</script>
