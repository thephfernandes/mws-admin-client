<template>
  <v-container class="news-table">
    <nuxt-link :to="'/manage/news/add'" title="Create a new post">
      <v-btn color="primary" class="new-post">
        Create a new post
      </v-btn>
    </nuxt-link>
    <div class="font-weight-bold">
      Click on any post to edit
    </div>
    <v-data-table
      :headers="tableHeaders"
      :items="posts"
      :loading="posts.length === 0"
      :footer-props="footerPropsOptions"
    >
      <template v-slot:body="props">
        <tr v-for="item in props.items" :key="item.Id" @click="editPost(item.Id)" class="news-post">
          <td class="text-center">{{ item.Id }}</td>
          <td>
            <div class="font-weight-bold text-h6">
              {{ item.Title }}
            </div>
            <div class="text-body-2 news-tags">
              <v-icon class="text-body-2">mdi-tag</v-icon>
              {{ item.Tags }}
            </div>
            <div>{{ item.PreviewText }}</div>
          </td>
          <td class="text-center text-body-2">{{ item.Writer }}</td>
          <td class="text-center text-body-2">{{ item.Created }}</td>
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
import { INews } from "~/interfaces/INews";

@Component
export default class News extends Vue {
  @Prop({ type: Array, required: true }) posts!: INews[];

  private footerPropsOptions = {
    showFirstLastPage: true,
    firstIcon: "mdi-arrow-collapse-left",
    lastIcon: "mdi-arrow-collapse-right",
  };

  private tableHeaders = [
    { text: "ID", sortable: false, align: "center" },
    { text: "Content", sortable: false, align: "center" },
    { text: "Writer", sortable: false, align: "center" },
    { text: "Created", sortable: false, align: "center" },
    { text: "Published", sortable: false, align: "center" },
  ];

  editPost(Id: number) {
    this.$router.push({ path: "/manage/news/" + Id })
  }
}
</script>

<style>
.v-data-table-header th,
.news-table td div,
.news-table td {
  padding: 0.4rem;
}

.news-table .new-post {
  margin-bottom: 1rem;
}

.news-tags {
  color: #555;
}

tr.news-post:hover {
  background-color: #dde;
  cursor: pointer;
}
</style>
