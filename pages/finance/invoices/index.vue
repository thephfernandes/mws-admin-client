<template>
    <div>
        <h1>Club invoices</h1>
        <invoices-datatable />
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from "nuxt-property-decorator";

    @Component
    export default class InvoicesPage extends Vue {
        layout(): string {
            return 'mws';
        }
    }
</script>
