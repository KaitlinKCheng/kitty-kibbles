<template>
    <b-modal
        id="formModal"
        :title="editing ? 'Edit Food' : 'Add New Food'"
    >
        <b-form>
            <b-form-group label="Brand">
                <b-form-input
                    v-model="formBrand"
                    type="text"
                    :placeholder="
                        editing && originalFood?.brand ? originalFood.brand : 'Purina'
                    "
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Name">
                <b-form-input
                    v-model="formName"
                    type="text"
                    :placeholder="
                        editing && originalFood?.name ? originalFood.name : 'Chicken & Liver'
                    "
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Size">
                <b-form-input
                    v-model="formSize"
                    type="text"
                    :placeholder="
                        editing && originalFood?.size ? originalFood.size : 'Small Can'
                    "
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Available">
                <b-form-input
                    v-model="formCount"
                    type="number"
                    min="0"
                ></b-form-input>
            </b-form-group>
        </b-form>
        <template #modal-footer="{ ok }">
            <b-button
                @click="[submitForm(), ok()]"
                variant="secondary"
                :disabled="!state"
            >Submit</b-button>
        </template>
    </b-modal>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import Food from "@/ts/classes/Food";
import { FOOD_INVALID_ID } from "@/ts/constants";

export default Vue.extend({
    name: "FoodPageForm",

    props: {
        editing: Boolean,
        foodItem: Food
    },

    data() {
        return {
            formBrand: "",
            formName: "",
            formSize: "",
            formCount: 0,
        };
    },

    computed: {
        brandState(): boolean {
            return this.formBrand !== null && this.formBrand !== "";
        },
        nameState(): boolean {
            return this.formName !== null && this.formName !== "";
        },
        sizeState(): boolean {
            return this.formSize !== null && this.formSize !== "";
        },
        state(): boolean {
            return this.brandState && this.nameState && this.sizeState;
        },
        originalFood(): Food {
            return this.foodItem;
        }
    },

    watch: {
        originalFood(newOriginalFood) {
            if (this.editing) {
                this.formBrand = newOriginalFood?.brand;
                this.formName = newOriginalFood?.name;
                this.formSize = newOriginalFood?.size;
                this.formCount = newOriginalFood?.count;
            }
        }
    },

    methods: {
        show(): void {
            this.$bvModal.show("formModal");
        },
        submitForm(): void {
            if (this.editing) {
                const updatedFood = this.originalFood;
                updatedFood.brand = this.formBrand;
                updatedFood.name = this.formName;
                updatedFood.size = this.formSize;
                updatedFood.count = this.formCount;

                store.dispatch("foods/updateFood", updatedFood);
            } else {
                store.dispatch("foods/addFood", new Food(
                    FOOD_INVALID_ID,
                    this.formBrand,
                    this.formName,
                    this.formSize,
                    this.formCount
                ));
            }

            this.clearForm();
            this.$emit("done-form");
        },
        clearForm(): void {
            this.formBrand = "";
            this.formName = "";
            this.formSize = "";
            this.formCount = 0;
        }
    }
});
</script>
