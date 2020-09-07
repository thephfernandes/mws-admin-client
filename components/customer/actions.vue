<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>Actions</v-card-title>
        <v-card-actions>
          <v-btn>New customer</v-btn>
          <v-btn>Save as CSV</v-btn>
        </v-card-actions>
        <v-card-subtitle>Listing</v-card-subtitle>
        <v-form>
          <v-container>
            <v-row>
              <v-col>
                <v-select :items="items"></v-select>
              </v-col>
              <v-col>
                <v-text-field label="Search"></v-text-field>
              </v-col>
              <v-col>
                <v-btn>Search</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card-subtitle>Start date</v-card-subtitle>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  private items = [10, 20, 30];
  name() {
    return "Actions";
  }
}
</script>
