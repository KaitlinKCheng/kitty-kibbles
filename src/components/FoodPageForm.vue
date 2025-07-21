<template>
    <b-modal
        id="formModal"
        :title="editing ? 'Edit Food' : 'Add New Food'"
    >
        <b-form @keydown.enter="submitForm()">
            <b-form-group label="Brand">
                <b-form-input
                    v-model="formBrand"
                    type="text"
                    :placeholder="
                        editing && originalFood?.brand ? originalFood.brand : 'Purina'
                    "
                    :state="submitted ? brandState : null"
                    autofocus
                ></b-form-input>
                <b-form-invalid-feedback>Please enter a brand.</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Name">
                <b-form-input
                    v-model="formName"
                    type="text"
                    :placeholder="
                        editing && originalFood?.name ? originalFood.name : 'Chicken & Liver'
                    "
                    :state="submitted ? nameState : null"
                ></b-form-input>
                <b-form-invalid-feedback>Please enter a name.</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Type">
                <b-form-radio-group v-model="formType">
                    <b-form-radio
                        v-for="value in foodTypes"
                        :key="value"
                        :value="value"
                    >{{ value }}</b-form-radio>
                </b-form-radio-group>
            </b-form-group>
            <b-form-group label="Size">
                <b-form-input
                    v-model="formSize"
                    type="text"
                    :placeholder="
                        editing && originalFood?.size ? originalFood.size : 'Small'
                    "
                    :state="submitted ? sizeState : null"
                ></b-form-input>
                <b-form-invalid-feedback>Please enter a size.</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Available">
                <b-form-input
                    v-model="formCount"
                    type="number"
                    min="0"
                    :state="submitted ? countState : null"
                ></b-form-input>
                <b-form-invalid-feedback>Please enter a positive number.</b-form-invalid-feedback>
            </b-form-group>
        </b-form>
        <template #modal-footer>
            <b-button
                @click="submitForm()"
                variant="secondary"
                :disabled="submitted && !state"
            >Submit</b-button>
        </template>
    </b-modal>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import Food from "@/ts/classes/Food";
import { FOOD_TYPES, FOOD_INVALID_ID } from "@/ts/constants";

export default Vue.extend({
    name: "FoodPageForm",

    props: {
        editing: Boolean,
        foodItem: Food
    },

    data() {
        return {
            foodTypes: FOOD_TYPES,
            formBrand: "",
            formName: "",
            formType: Object.values(FOOD_TYPES)[0],
            formSize: "",
            formCount: 0,
            submitted: false
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
        countState(): boolean {
            return this.formCount >= 0;
        },
        state(): boolean {
            return this.brandState && this.nameState && this.sizeState && this.countState;
        },
        originalFood(): Food {
            return this.foodItem;
        }
    },

    watch: {
        editing() {
            this.refreshFields();
        },
        originalFood: {
            deep: true,
            handler(): void {
                this.refreshFields();
            }
        }
    },

    methods: {
        show(): void {
            this.$bvModal.show("formModal");
        },
        submitForm(): void {
            this.submitted = true;

            if (!this.state) {
                return;
            }

            if (this.editing) {
                const updatedFood = this.originalFood;
                updatedFood.brand = this.formBrand;
                updatedFood.name = this.formName;
                updatedFood.type = this.formType;
                updatedFood.size = this.formSize;
                updatedFood.count = this.formCount;

                store.dispatch("foods/updateFood", updatedFood);
            } else {
                store.dispatch("foods/addFood", new Food(
                    FOOD_INVALID_ID,
                    this.formBrand,
                    this.formName,
                    this.formType,
                    this.formSize,
                    this.formCount
                ));
            }

            this.resetFields();
            this.submitted = false;
            this.$bvModal.hide("formModal");
            this.$emit("done-form");
        },
        resetFields(): void {
            this.formBrand = "";
            this.formName = "";
            this.formType = Object.values(FOOD_TYPES)[0];
            this.formSize = "";
            this.formCount = 0;
        },
        matchFieldsToFood(): void {
            this.formBrand = this.originalFood.brand;
            this.formName = this.originalFood.name;
            this.formType = this.originalFood.type;
            this.formSize = this.originalFood.size;
            this.formCount = this.originalFood.count;
        },
        refreshFields(): void {
            if (this.editing) {
                this.matchFieldsToFood();
            } else {
                this.resetFields();
            }

            this.submitted = false;
        }
    }
});
</script>
