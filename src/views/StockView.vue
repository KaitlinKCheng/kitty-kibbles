<template>
    <StockPage />
</template>

<script lang="ts">
import Vue from "vue";
import StockPage from "@/components/StockPage.vue";

export default Vue.extend({
    name: "StockView",
    components: { StockPage }
});
</script>
