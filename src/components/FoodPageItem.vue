<template>
    <b-container>
        <b-card
            :header="food.brand + ' – ' + food.name + ' (' + food.size + ')'"
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
                        @click="decrementStock(1)"
                        variant="danger"
                        :disabled="food.count <= 0"
                    >
                        <fa-icon icon="fa-solid fa-minus" />
                    </b-button>
                    <span>{{ food.count + " remaining" }}</span>
                    <b-button
                        @click="incrementStock(1)"
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
                        :id="updateStockBtnId"
                        class="w-100"
                        variant="info"
                    >
                        <span>Stock</span>&nbsp;
                        <fa-icon icon="fa-solid fa-cubes" />
                    </b-button>
                    <b-popover
                        :id="updateStockPopoverId"
                        :target="updateStockBtnId"
                        triggers="click blur"
                        placement="bottom"
                    >
                        <template #title>
                            <span>Update Stock</span>
                            <b-button
                                class="close"
                                @click="$root.$emit('bv::hide::popover', updateStockPopoverId)"
                                variant="light"
                                aria-label="Close"
                            >
                                <fa-icon icon="fa-solid fa-times" />
                            </b-button>
                        </template>
                        <b-form>
                            <b-form-group
                                label="Add"
                                :invalid-feedback="addStockInvalidFeedback"
                            >
                                <b-form-input
                                    v-model="formAddStock"
                                    type="number"
                                    min="0"
                                    :state="addStockState"
                                ></b-form-input>
                            </b-form-group>
                            <b-form-group
                                label="Remove"
                                :invalid-feedback="removeStockInvalidFeedback"
                            >
                                <b-form-input
                                    v-model="formRemoveStock"
                                    type="number"
                                    min="0"
                                    :state="removeStockState"
                                ></b-form-input>
                            </b-form-group>
                            <b-button
                                @click="submitStockUpdate()"
                                variant="secondary"
                                :disabled="!addStockState || !removeStockState"
                            >Submit</b-button>
                        </b-form>
                    </b-popover>
                </b-row>
                <b-row class="mt-1">
                    <b-button
                        class="w-100"
                        @click="editFood()"
                        variant="secondary"
                    >
                        <span>Edit</span>&nbsp;
                        <fa-icon icon="fa-solid fa-pen-to-square" />
                    </b-button>
                </b-row>
                <b-row class="mt-1">
                    <b-button
                        class="w-100"
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

    data() {
        return {
            formAddStock: 0,
            formRemoveStock: 0
        };
    },

    computed: {
        food(): Food {
            return this.displayFood;
        },
        updateStockBtnId(): string {
            return this.food.id + "stockBtn";
        },
        updateStockPopoverId(): string {
            return this.food.id + "popover";
        },
        addStockState(): boolean {
            return this.formAddStock >= 0;
        },
        addStockInvalidFeedback(): string {
            if (this.formAddStock < 0) {
                return "Please enter a positive number.";
            } else {
                return "";
            }
        },
        removeStockState(): boolean {
            return this.formRemoveStock >= 0 && this.updatedRemainingStock >= 0;
        },
        removeStockInvalidFeedback(): string {
            if (this.formRemoveStock < 0) {
                return "Please enter a positive number.";
            } else if (this.updatedRemainingStock < 0) {
                return "Stock remaining cannot be negative.";
            } else {
                return "";
            }
        },
        updatedRemainingStock(): number {
            return Number(this.food.count) + Number(this.formAddStock) - Number(this.formRemoveStock);
        }
    },

    methods: {
        incrementStock(num: number): void {
            store.dispatch("foods/incrementStock", { id: this.food.id, add: num });
            this.$forceUpdate();
        },
        decrementStock(num: number): void {
            store.dispatch("foods/decrementStock", { id: this.food.id, sub: num });
            this.$forceUpdate();
        },
        editFood(): void {
            this.$emit("edit-food", this.food);
        },
        deleteFood(): void {
            this.$emit("delete-food", this.food.id);
        },
        submitStockUpdate() {
            this.incrementStock(this.formAddStock);
            this.decrementStock(this.formRemoveStock);

            this.formAddStock = 0;
            this.formRemoveStock = 0;

            this.$root.$emit('bv::hide::popover', this.updateStockPopoverId);
        }
    }
});
</script>
