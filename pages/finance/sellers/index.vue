<template>
    <div>
        <h1>Finance: Sellers</h1>
        <sellers-datatable :sellers="sellers" />
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class Index extends Vue {

    layout(): string {
        return 'mws';
    }

    get sellers() {
        return this.$store.getters['sellers/getSellers'];
    }

    mounted(): void {
        this.$store.dispatch('sellers/fillSellers');
    }
}
</script>
