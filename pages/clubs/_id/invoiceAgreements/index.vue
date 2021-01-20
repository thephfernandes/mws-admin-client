<template>
</template>
<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class IndexInvoiceAgreement extends Vue {
  layout(): string {
    return 'mws';
  }

  middleware({redirect, route}: any) {
    return redirect(`/clubs/${route.params.id}`);
  }
}
</script>
