<template>
  <Modal :isOpen="!!component" :title="title" @onClose="handleClose">
    <component :is="component" @onClose="handleClose" v-bind="props" />
  </Modal>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import Modal from "./modal.vue";

@Component({
  components: {
    Modal,
  },
})
export default class modal extends Vue {
  component = null;
  title = "";
  props = null;

  handleClose() {
    this.component = null;
  }

  handleKeyup(e: KeyboardEvent) {
    if (e.keyCode === 27) this.handleClose();
  }

  created() {
    this.$nuxt.$on(
      "open-modal",
      ({ component = null, title = "", props = null }) => {
        this.component = component;
        this.title = title;
        this.props = props;
      }
    );
    document.addEventListener("keyup", this.handleKeyup);
  }

  beforeDestroy() {
    document.removeEventListener("keyup", this.handleKeyup);
    this.$nuxt.$off("open-modal");
  }
}
</script>