<template>
    <div>
        <v-data-table
            :items="clubs"
            :headers="headers"
            :search="search"
            :loading="clubs.length === 0"
            :footer-props="footerPropsOptions"
            @click:row="toClub"
            class="clubs-table"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>View invoice agreements of a club</v-toolbar-title>
                    <v-spacer />
                    <v-text-field label="Search club" v-model="search" dense outlined hide-details />
                </v-toolbar>
            </template>
        </v-data-table>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import {IClub} from "~/interfaces/IClub";

@Component
export default class clubsDatatableComponent extends Vue {
    search: string = '';
    loaded: boolean = false;
    footerPropsOptions = {
        'items-per-page-options': [5, 10, 25, 50]
    };

    toClub(club: IClub) {
        this.$router.push({name: 'clubs-id', params: { id: club.id.toString() }});
    }

    get clubs(): IClub[] {
        return this.$store.getters['clubs/getClubs'];
    }

    created() {
        this.$store.dispatch('clubs/getClubsSetToStore');
    }

    layout(): string {
        return 'mws';
    }

    get headers() {
        return [
            {
                text: 'Id',
                value: 'id',
                width: 100,
                divider: true
            },
            {
                text: 'Club name',
                value: 'name'
            }
        ];
    }
}
</script>
<style lang="scss">
    .clubs-table {
        .text-start {
            &:hover {
                cursor: pointer;
            }
        }
    }
</style>
