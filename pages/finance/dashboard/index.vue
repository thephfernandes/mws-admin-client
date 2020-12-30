<template>
    <div>
        <v-row>
            <v-col cols="12">
                <h1>Finance: Dashboard</h1>
                <proceeds-per-month></proceeds-per-month>
            </v-col>
            <v-col cols="12">
                <proceeds-datatable></proceeds-datatable>
            </v-col>
        </v-row>
    </div>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";

@Component
export default class DashboardPage extends Vue {

    layout(): string {
        return 'mws';
    }
}
</script>
