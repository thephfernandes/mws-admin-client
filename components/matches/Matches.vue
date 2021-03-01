<template>
  <v-container class="matches-table">
    <v-row>
      <v-col v-for="(stat, index) in stats" :key="index" cols="12" sm="6" md="6" lg="3">
        <v-card>
          <v-card-title class="justify-space-between">
            <v-icon class="text-h3 mdi-flip-h green--text">{{ stat.icon }}</v-icon>
            <span>
              <div class="text-body-2 grey--text text--darken-1 text-right">{{ stat.name }}</div>
              <div class="text-h5 text-right">{{ stat.amount }}</div>
            </span> 
          </v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-card-text>
            <div class="text-body-2 grey--text text--darken-2 text-right">
              {{ stat.title }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <nuxt-link :to="'/finance/matches/add'" title="Create a new match">
      <v-btn color="primary" class="new-match">
        Create a new match
      </v-btn>
    </nuxt-link>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <div class="font-weight-bold">
      Click on any match to edit information
    </div>
    <br />
    <v-data-table
      :headers="tableHeaders"
      :items="matches"
      :items-per-page="10"
      class="elevation-1 charity-table"
      :search="search"
      @click:row="editMatch"
      :footer-props="footerPropsOptions"
      :loading="matches.length === 0"
    >
    <template v-slot:item.HomeClubName="{ item }">
      <div :class="isFeaturedClub(item, true) ? 'font-weight-bold' : ''">
        {{item.HomeClubName}}
      </div>
    </template>
    <template v-slot:item.VisitingClubName="{ item }">
      <div :class="isFeaturedClub(item, false) ? 'font-weight-bold' : ''">
        {{item.VisitingClubName}}
      </div>
    </template>
    </v-data-table>
    <br />
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { IScheduledMatch, IStat } from "~/interfaces/IScheduledMatch"

interface keyable {
  [key: string]: any;
}

@Component
export default class Matches extends Vue {
  @Prop({ type: Array, required: true }) matches!: IScheduledMatch[];
  @Prop({ type: Array, required: true }) stats!: IStat[];

  private search = "";
  private footerPropsOptions = {
    showFirstLastPage: true,
    firstIcon: "mdi-arrow-collapse-left",
    lastIcon: "mdi-arrow-collapse-right",
    itemsPerPageOptions: [5, 10, 25, 50],
  };

  private tableHeaders = [
    {
      text: "Local Team",
      sortable: false,
      align: "center",
      value: "HomeClubName",
    },
    {
      text: "Visitor Team",
      sortable: false,
      align: "center",
      value: "VisitingClubName",
    },
    {
      text: "Date",
      sortable: false,
      align: "center",
      value: "localDate",
      width: "12rem",
    },
    {
      text: "Status",
      sortable: false,
      align: "center",
      value: "status",
    },
    {
      text: "Worn",
      sortable: false,
      align: "center",
      value: "worn",
    },
  ];

  editMatch(e: keyable) {
    this.$router.push({ path: "/finance/matches/" + e.ID });
  }

  isFeaturedClub(match: IScheduledMatch, isHome: boolean) {
    if (isHome) {
      return match.FeaturedClubName === match.HomeClubName;
    } else {
      return match.FeaturedClubName === match.VisitingClubName;
    }
  }
}
</script>

<style>
.v-data-table td {
  padding: 0.5rem !important;
}

.matches-table tbody tr {
  cursor: pointer;
}
</style>
