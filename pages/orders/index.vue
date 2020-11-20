<template>
    <div>
        <h1>Orders</h1>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from "nuxt-property-decorator";

    @Component
    export default class IndexOrders extends Vue {
        layout(): string {
            return 'mws';
        }
    }
</script>