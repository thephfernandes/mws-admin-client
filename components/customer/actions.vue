<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>Actions</v-card-title>
        <v-card-actions>
          <nuxt-link
            to="customers/add"
            class="v-btn v-btn--contained theme--light v-size--default"
          >Create new customer</nuxt-link>
          <v-btn @click="modalTest()">Save as CSV</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { mapState, mapGetters, mapMutations } from "vuex";
import Vue, { PropOptions } from "vue";
import Alert from "../alert.vue";

export default Vue.extend({
  name: "actions",

  data() {
    return {
      items: [10, 20, 30],
    };
  },
  methods: {
    modalTest() {
      this.$nuxt.$emit("open-modal", {
        component: Alert,
        title: "Modal test",
        props: { text: "Dit is een test." },
      });
    },
  },
});
</script>


