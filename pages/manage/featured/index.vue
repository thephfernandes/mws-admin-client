<template>
    <div>
    This is where the magic happens!
        <v-data-table>
            <template v-slot:body="props">
                <draggable :list="props.items" tag="tbody">
                    <tr v-for="(item, index) in props.items" :key="index"></tr>
                    <td>{{ item.home_team }}</td>
                    <td>{{ item.away_team }}</td>
                    <td>{{ item.match_date }}</td>
                    <td>{{ item.finished }}</td>
                </draggable>
            </template>
        </v-data-table>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class Index extends Vue {
  layout() {
    return "mws";
  }
};
</script>

<style>
</style>