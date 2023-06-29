<template>
    <b-modal
        id="formModal"
        title="Add New Food"
    >
        <b-form>
            <b-form-group label="Brand">
                <b-form-input
                    v-model="formBrand"
                    type="text"
                    placeholder="Purina"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Name">
                <b-form-input
                    v-model="formName"
                    type="text"
                    placeholder="Chicken & Liver"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Size">
                <b-form-input
                    v-model="formSize"
                    type="text"
                    placeholder="Small Can"
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
        }
    },

    methods: {
        show(): void {
            this.$bvModal.show("formModal");
        },
        submitForm(): void {
            store.dispatch("foods/addFood", new Food(
                FOOD_INVALID_ID,
                this.formBrand,
                this.formName,
                this.formSize,
                this.formCount
            ));

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
