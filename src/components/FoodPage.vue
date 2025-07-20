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
        <b-row
            cols="1"
            cols-sm="2"
            cols-lg="3"
            align-h="center"
        >
            <b-col
                v-for="food in getFoodStock.values()"
                :key="food.id + food.brand + food.name + food.size + food.count"
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
            @done-form="[$forceUpdate(), editing = false]"
        />
    </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import Food from "@/ts/classes/Food";
import FoodPageForm from "@/components/FoodPageForm.vue";
import FoodPageItem from "@/components/FoodPageItem.vue";

export default Vue.extend({
    name: "FoodPage",
    components: {
        FoodPageForm,
        FoodPageItem
    },

    mounted() {
        store.dispatch("foods/init");
    },

    data() {
        return {
            currentFood: new Food(),
            editing: false
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
                }
            });
        }
    }
});
</script>
