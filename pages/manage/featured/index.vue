<template>
    <div>
    This is where the magic happens!
    <MatchTable :matchItems="matches"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import MatchTable from "@/components/content/matches/MatchTable.vue"

@Component({
    components: {
        MatchTable
    }
})
export default class Index extends Vue {
    private matches: Object[] = [
        {
            home_team: "manchester",
            away_team: "liverpool",
            match_date: "01-01-9999",
            finished: false,
        },
        {
            home_team: "chelsea",
            away_team: "totenham",
            match_date: "01-01-8888",
            finished: false,
        },
        {
            home_team: "lorem FC",
            away_team: "ipsum madrid",
            match_date: "01-01-7777",
            finished: false
        }
    ]

    layout() {
        return "mws";
    }
};
</script>

<style>
</style>