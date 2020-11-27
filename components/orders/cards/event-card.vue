<template>
    <v-card tile :to="`/events/${eventId}`" >
        <v-img :src="eventImage" height="200px" gradient="to top right, rgba(0,0,0,.33), rgba(100,100,100,.9)">
            <v-card-title class="white--text">Event info</v-card-title>
            <v-card-subtitle class="white--text">ID: {{eventId}}</v-card-subtitle>
        </v-img>
        <v-card-text>
            <v-list>
                <v-list-item>
                    <v-icon class="mr-2">mdi-soccer-field</v-icon>
                    {{event.home_club }} - {{event.visiting_club}}
                </v-list-item>
                <v-list-item>
                    <v-icon class="mr-2">mdi-clock-time-eight</v-icon>
                    {{event.date | dateFormat(true) }} - {{event.end_date | dateFormat(true)}}
                </v-list-item>
                <v-list-item>
                    <v-icon class="mr-2">mdi-stadium</v-icon>
                    {{event.stadium}}
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>
<script lang="ts">
    import {Vue, Component, Prop} from "nuxt-property-decorator";

    @Component
    export default class EventCardComponent extends Vue {
        @Prop({ required: true }) readonly eventId!: number;

        name(): string {
            return 'event-card-component';
        }

        get event() {
            return this.$store.getters['orders/getEvent'](this.eventId);
        }

        get eventImage(): string {
            return `https://matchwornshirt.imgix.net/club/${this.event.featured_club_id}/background_v2.png?h=500&w=500&fm=jpg2&auto=compress`;
        }
    }
</script>