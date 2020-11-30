<template>
    <div>
        <v-card-title>Notifications</v-card-title>
        <v-divider />
        <v-card-title>Status</v-card-title>
        <v-card-title>Payments</v-card-title>
        <v-card-title>Open/Read/Delivered (SendGrid notifications)</v-card-title>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from "nuxt-property-decorator";

    @Component
    export default class NotificationComponent extends Vue {
        name(): string {
            return 'notification-component';
        }
    }
</script>