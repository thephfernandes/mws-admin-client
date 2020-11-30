<template>
  <v-container class="match-table">
      <v-data-table
        :headers="tableHeaders"
        :items="matchItems"
      >
            <template v-slot:body="props">
                <draggable :list="props.items" tag="tbody">
                    <tr v-for="(item, index) in props.items" :key="index">
                        <td>{{ item.home_team }}</td>
                        <td>{{ item.away_team }}</td>
                        <td>{{ item.match_date }}</td>
                        <td>{{ item.finished }}</td>
                    </tr>
                </draggable>
            </template>
        </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import draggable from "vuedraggable"

@Component({
    components: {
        draggable
    }
})
export default class MatchTable extends Vue {
    @Prop() matchItems !: []

    private tableHeaders = [
        { text: '', sortable: false },
        { text: '', sortable: false },
        { text: 'date', sortable: false },
        { text: 'finished', sortable: false },
    ]
}
</script>

<style>
</style>