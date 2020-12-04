<template>
  <v-container class="news-table">
    <nuxt-link
      :to="'/manage/news/editpost/0'"
      title="Create a new post"
    >
      <v-btn color="primary" class="new-post">
        Create a new post
      </v-btn>
    </nuxt-link>
    <v-data-table :headers="tableHeaders" :items="posts">
      <template v-slot:body="props">
        <tr v-for="item in props.items" :key="item.Id">
          <td class="text-center">{{ item.Id }}</td>
          <td>
            <div class="font-weight-bold text-h6">
              {{ item.Title }}
              <nuxt-link
                :to="'/manage/news/editpost/' + item.Id"
                class="v-btn v-btn--container ml-auto"
                title="Edit this post"
              >
                <v-icon>mdi-pencil-box</v-icon>
              </nuxt-link>
            </div>
            <div class="text-body-2">
              <v-icon class="text-body-2">mdi-tag</v-icon>
              {{ item.Tags }}
            </div>
            <div>{{ item.PreviewText }}</div>
          </td>
          <td class="text-center">{{ item.Writer }}</td>
          <td class="text-center">{{ item.Created }}</td>
          <td class="text-center">
            <v-icon v-if="item.Published" class="green--text text-h4">
              mdi-check-bold
            </v-icon>
            <v-icon v-else class="red--text text-h4">mdi-close-thick</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import draggable from "vuedraggable";

@Component({
  components: {
    draggable,
  },
})
export default class MatchTable extends Vue {
  @Prop() posts!: [];

  private tableHeaders = [
    { text: "ID", sortable: false, align: "center" },
    { text: "Content", sortable: false, align: "center" },
    { text: "Writer", sortable: false, align: "center" },
    { text: "Created", sortable: false, align: "center" },
    { text: "Published", sortable: false, align: "center" },
  ];
}
</script>

<style>
.v-data-table-header th,
.news-table td div,
.news-table td {
  padding: 0.5rem;
}

.news-table .new-post {
  margin-bottom: 1rem;
}

</style>
