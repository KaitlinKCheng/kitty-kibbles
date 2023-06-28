<template>
    <b-container>
        <b-col
            class="mt-3"
            align="center"
        >
            <b-button
                @click="showFoodForm()"
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
                :key="food.id"
                class="my-3"
            >
                <FoodPageItem :display-food="food" />
            </b-col>
        </b-row>
        <FoodPageForm @done-form="$forceUpdate()" />
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

    computed: {
        getFoodStock(): Map<string, Food> {
            return store.state.foods.foodStock;
        },
    },

    methods: {
        showFoodForm(): void {
            this.$bvModal.show("formModal");
        }
    }
});
</script>
