<template>
    <div>
        <h2 v-if="club">{{club.name}}</h2>
        <invoice-agreements-datatable :clubId="clubId" />
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

    async created() {
        this.clubId = parseInt(this.$route.params.id);
        this.$store.dispatch('clubs/getInvoiceAgreementsSetToStore', this.clubId);
        await this.setClubs();
    }

    get club(): IClub {
        return this.$store.getters['clubs/getClub'](this.clubId);
    }

    layout(): string {
        return 'mws';
    }

    async setClubs(): Promise<void> {
        let clubs: IClub[] = this.$store.getters['clubs/getClubs'];
        if (clubs.length  === 0) {
            await this.$store.dispatch("clubs/getClubsSetToStore");
            clubs = this.$store.getters['clubs/getClubs'];
        };
        this.$store.dispatch('clubs/getClubsSetToStore');
    }
}
</script>
