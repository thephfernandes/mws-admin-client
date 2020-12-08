<template>
    <div>
        <clubs-datatable :clubs="clubs"/>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class Index extends Vue {
    layout(): string {
        return 'mws';
    }

    get clubs() {
        return this.$store.getters['clubs/getClubs'];
    }

    mounted() {
        this.$store.dispatch('clubs/fillClubs');
    }
}
</script>
