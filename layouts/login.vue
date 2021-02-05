<template>
    <v-app>
        <v-main>
          <video autoplay muted loop class="loginBackgroundVideo">
            <source :src="getBackgroundVideoSource()" type="video/mp4">
          </video>

          <v-container>
            <nuxt />
          </v-container>
        </v-main>
    </v-app>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class Login extends Vue {

  videoSources = [
    "https://mws-imgix.s3-eu-west-1.amazonaws.com/videos/Adyen_1st+draft.mp4",
    "https://mws-imgix.s3-eu-west-1.amazonaws.com/videos/atletico+madrid_edit_1920x1080.mp4",
    "https://mws-imgix.s3-eu-west-1.amazonaws.com/videos/barcelona_edit_1920x1080.mp4",
    "https://mws-imgix.s3-eu-west-1.amazonaws.com/videos/BRC_MWS_1920x1080_engels.mp4",
    "https://mws-imgix.s3-eu-west-1.amazonaws.com/videos/colo+colo_video_edit_2.mp4",
    "https://mws-imgix.s3-eu-west-1.amazonaws.com/videos/FORTALEZA_1920x1080.mp4",
    "https://mws-imgix.s3-eu-west-1.amazonaws.com/videos/riverplate_edit_1920x1080.mp4",
    "https://mws-imgix.s3-eu-west-1.amazonaws.com/videos/RP_MWS_PromoVideo_1920X1080.mp4",
    "https://mws-imgix.s3-eu-west-1.amazonaws.com/videos/BRG_MWS_1920x1080.mp4",
    "https://mws-imgix.s3-eu-west-1.amazonaws.com/videos/BSK_MWS_1920x1080.mp4",
    "https://mws-imgix.s3-eu-west-1.amazonaws.com/videos/CLT_MWS_1920x1080.mp4",
    "https://mws-imgix.s3-eu-west-1.amazonaws.com/videos/PRO_MWS_SignedShirts1b_1920x1080.mp4",
    "https://mws-imgix.s3-eu-west-1.amazonaws.com/videos/NICE_MWS_1920x1080_promo.mp4",
    "https://mws-imgix.s3-eu-west-1.amazonaws.com/videos/HONDURAS_MWS_1920x1080.mp4",
    "https://mws-imgix.s3-eu-west-1.amazonaws.com/videos/CROATIA_1920x1080.mp4",
  ];


  getBackgroundVideoSource(): string {
    return this.videoSources[Math.floor(Math.random() * this.videoSources.length)];
  }
}
</script>
<style lang="scss" scoped>
    .loginBackgroundVideo {
      position: fixed;
      right: 0;
      bottom: 0;
      min-width: 100%;
      min-height: 100%;
    }
</style>
