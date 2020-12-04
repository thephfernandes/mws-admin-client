<template>
    <div>
        <h2>{{club.name}}</h2>
        <invoice-agreements-datatable :agreements="agreements" :clubId="clubId" />
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import InvoiceAgreementsDatatable from "~/components/finance/invoice-agreements-datatable.vue";
import {IClub} from "~/interfaces/IClub";
import {IInvoiceAgreement} from "~/interfaces/IInvoiceAgreement";

@Component({
    components: {InvoiceAgreementsDatatable}
})
export default class clubDetailPage extends Vue {
    clubId: number = 0;

    created() {
        this.clubId = parseInt(this.$route.params.id);
        this.$store.dispatch('clubs/getInvoiceAgreement', this.clubId);
        this.setClubs();
    }

    get agreements(): IInvoiceAgreement[] {
        return this.$store.getters['clubs/getInvoiceAgreements'];
    }

    get club(): IClub {
        return this.$store.getters['clubs/getClub'](this.clubId);
    }

    layout(): string {
        return 'mws';
    }

    setClubs(): void {
        const clubs: IClub[] = this.$store.getters['clubs/getClubs'];
        if (clubs.length > 0) return;
        this.$store.dispatch('clubs/fillClubs');
    }
}
</script>
