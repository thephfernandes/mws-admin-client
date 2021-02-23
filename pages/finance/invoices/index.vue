<template>
    <div>
        <h1>Club invoices</h1>
        <invoices-datatable />
    </div>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import InvoicesDatatableComponent from "@/components/finance/invoices-datatable.vue";

@Component({
    components: {
        'invoices-datatable': InvoicesDatatableComponent,
    }
})
export default class InvoicesPage extends Vue {
    layout(): string {
        return 'mws';
    }
}
</script>
