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
            <b-card-body>
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
            </b-card-body>
            <b-card-footer
                footer-bg-variant="white"
                footer-border-variant="primary"
            >
                <b-row>
                    <b-button
                        @click="editFood()"
                        variant="secondary"
                    >
                        <span>Edit</span>&nbsp;
                        <fa-icon icon="fa-solid fa-pen-to-square" />
                    </b-button>
                    <b-button
                        class="ml-2"
                        @click="deleteFood()"
                        variant="danger"
                    >
                        <span>Delete</span>&nbsp;
                        <fa-icon icon="fa-solid fa-trash" />
                    </b-button>
                </b-row>
            </b-card-footer>
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
        editFood(): void {
            this.$emit("edit-food", this.food);
        },
        deleteFood(): void {
            this.$emit("delete-food", this.food.id);
        },
    }
});
</script>
