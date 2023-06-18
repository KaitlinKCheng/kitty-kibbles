<template>
    <FoodPage />
</template>

<script lang="ts">
import Vue from "vue";
import FoodPage from "@/components/FoodPage.vue";

export default Vue.extend({
    name: "FoodView",
    components: { FoodPage }
});
</script>
