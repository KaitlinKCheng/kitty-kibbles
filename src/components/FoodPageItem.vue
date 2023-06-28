<template>
    <b-container>
        <b-card
            class="card"
            :header="food.brand + ' – ' + food.name"
            header-text-variant="light"
            header-bg-variant="primary"
            header-border-variant="primary"
            border-variant="primary"
        >
            <b-row
                class="text-center"
                align-h="between"
            >
                <b-button
                    @click="decrementStock()"
                    variant="danger"
                    :disabled="food.count <= 0"
                >
                    <fa-icon icon="fa-solid fa-minus" />
                </b-button>
                <b-row class="flex-column">
                    <b-col align-self="center">
                        <span>{{ food.size }}</span>
                    </b-col>
                    <b-col align-self="center">
                        <span>{{ food.count + " remaining" }}</span>
                    </b-col>
                </b-row>
                <b-button
                    @click="incrementStock()"
                    variant="success"
                >
                    <fa-icon icon="fa-solid fa-plus" />
                </b-button>
            </b-row>
        </b-card>
    </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import Food from "@/ts/classes/Food";

export default Vue.extend({
    name: "FoodPageItem",

    props: {
        displayFood: Food
    },

    computed: {
        food(): Food {
            return this.displayFood;
        }
    },

    methods: {
        incrementStock(): void {
            store.dispatch("foods/incrementStock", { id: this.food.id, add: 1 });
            this.$forceUpdate();
        },
        decrementStock(): void {
            store.dispatch("foods/decrementStock", { id: this.food.id, sub: 1 });
            this.$forceUpdate();
        },
    }
});
</script>
