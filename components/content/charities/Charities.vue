<template>
  <v-container class="charity-table">
    <slot></slot>
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
      Click on any charity to edit information
    </div>
    <br />
    <v-data-table
      :headers="tableHeaders"
      :items="charities"
      :items-per-page="10"
      class="elevation-1 charity-table"
      :search="search"
      @click:row="editCharity"
      :footer-props="footerPropsOptions"
      :loading="charities.length === 0"
    >
      <template v-slot:item.description="{ item }">
        <div class="text-justify">
          {{ item.description }}
        </div>
      </template>
    </v-data-table>
    <br />
    <v-row>
      <v-col cols="12" sm="6" md="6" xl="3">
        <v-card>
          <v-card-title class="justify-space-between">
            <v-icon class="text-h3 green--text">mdi-cash-check</v-icon>
            <span class="text-h6 grey--text text--darken-1">{{ total }}</span>
          </v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-card-text>
            <div class="text-body-1 grey--text text--darken-2 text-right">
              Total money raised all time
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6" xl="3">
        <v-card>
          <v-card-title class="justify-space-between">
            <v-icon class="text-h3 green--text">mdi-chart-box</v-icon>
            <span class="text-h6 grey--text text--darken-1">
              {{ total_last_month }}
            </span>
          </v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-card-text>
            <div class="text-body-1 grey--text text--darken-2 text-right">
              Money raised last month
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { ICharity } from "~/interfaces/ICharity"

interface keyable {
  [key: string]: any;
}

@Component
export default class Charities extends Vue {
  @Prop({ type: Array, required: true }) charities!: ICharity[];
  @Prop({ type: String, required: true }) total!: "";
  @Prop({ type: String, required: true }) total_last_month!: "";
  private search = "";
  private footerPropsOptions = {
    showFirstLastPage: true,
    firstIcon: "mdi-arrow-collapse-left",
    lastIcon: "mdi-arrow-collapse-right",
    itemsPerPageOptions: [5, 10, 15, 20, -1],
  };

  private tableHeaders = [
    {
      text: "ID",
      sortable: true,
      align: "center",
      value: "id",
      width: "4rem",
    },
    {
      text: "Title",
      sortable: true,
      align: "center",
      value: "title",
      width: "10rem",
    },
    {
      text: "Raised",
      sortable: true,
      align: "center",
      value: "total_raised",
      width: "6rem",
    },
    {
      text: "Description",
      sortable: false,
      align: "center",
      value: "description",
    },
  ];

  editCharity(e: keyable) {
    this.$router.push({ path: "/manage/charities/editcharity/" + e.id });
  }
}
</script>

<style>
.v-data-table td {
  padding: 1.5rem !important;
}

.charity-table tbody tr {
  cursor: pointer;
}
</style>
