<template>
    <div>
        <h2>{{club.name}}</h2>
        <invoice-agreements-datatable :agreements="agreements" />
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import InvoiceAgreement from "~/models/invoiceAgreement";
import InvoiceAgreementsDatatable from "~/components/finance/invoice-agreements-datatable.vue";
import {IClub} from "~/interfaces/IClub";

@Component({
    components: {InvoiceAgreementsDatatable}
})
export default class clubDetailPage extends Vue {
    clubId: number = 0;
    agreements: InvoiceAgreement[] = [new InvoiceAgreement()];

    created() {
        this.clubId = parseInt(this.$route.params.id);
        this.$store.dispatch('clubs/getInvoiceAgreement', this.clubId).then((response) => {
            if (response.status === 200) {
                this.agreements = response.data;
            }
            });
    }

    get club(): IClub {
        return this.$store.getters['clubs/getClub'](this.clubId);
    }

    layout(): string {
        return 'mws';
    }
}
</script>
