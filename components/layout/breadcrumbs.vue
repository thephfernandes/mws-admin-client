<template>
  <div>
    <v-breadcrumbs :items="getBreadcrumbs()"></v-breadcrumbs>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { IClub } from "~/interfaces/IClub";
import { ISeller } from "~/interfaces/ISeller";
import { IInvoiceAgreement } from "~/interfaces/IInvoiceAgreement";

@Component
export default class Breadcrumbs extends Vue {
  name() {
    return "breadcrumbs";
  }

  getBreadcrumbs() {
    let crumbs: Array<any> = [];

    const fullPathArray = this.$route.fullPath.split('/');
    let paths: Array<string> = [];
    const disabledCrumbs = ['Products', 'Finance'];
    fullPathArray.shift();
    fullPathArray.forEach((p: string, index: number) => {
      if (paths.length > 0) {
        paths.push(paths[index - 1] + '/' + p)
      } else {
        paths.push('#/' + p);
      }

      let crumb = {
        text: p.charAt(0).toUpperCase() + p.slice(1),
        href: paths[index],
        disabled: false
      };

      if (disabledCrumbs.includes(crumb.text)) {
        crumb.disabled = true;
      }

      crumbs.push(crumb);
    });

    if (crumbs.length > 1) {
      if (crumbs[0].text == 'Clubs') {
        crumbs[1].text = this.getClubName(parseInt(crumbs[1].text));
      }
    }
    if (crumbs.length > 2) {
      if (crumbs[1].text == 'Sellers') {
        crumbs[2].text = this.getSellerName(parseInt(crumbs[2].text));
      }
      if (crumbs[2].text == 'InvoiceAgreements') {
        crumbs[3].text = this.getInvoiceAgreementName(parseInt(crumbs[3].text))
      }
    }

    crumbs[crumbs.length - 1].disabled = true;

    return crumbs;
    }

    getClubName(clubId: number): string {
      const club: IClub = this.$store.getters['clubs/getClub'](clubId);
      if (!club) return clubId.toString();
      return club.name;
    }

    getSellerName(sellerId: number): string {
      const seller: ISeller = this.$store.getters['sellers/getSeller'](sellerId)
      if (!seller) return sellerId.toString();
      return seller.name;
    }

    getInvoiceAgreementName(invoiceId: number): string {
      const invoice: IInvoiceAgreement = this.$store.getters['clubs/getInvoiceAgreement'](invoiceId);
      if (!invoice) return invoiceId.toString();
      return invoice.name;
    }
}
</script>
