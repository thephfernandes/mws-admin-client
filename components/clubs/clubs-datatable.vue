<template>
    <div>
        <v-data-table
            :items="clubs"
            :headers="headers"
            :search="search"
            :footer-props="footerPropsOptions"
            @click:row="toClub"
            class="clubs-table"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-text-field label="Search club" v-model="search" />
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
    @Prop({ type: Array, required: true }) readonly clubs!: IClub[];
    search: string = '';
    footerPropsOptions = {
        'items-per-page-options': [5, 10, 25, 50]
    };

    toClub(club: IClub) {
        this.$router.push({name: 'clubs-id', params: { id: club.id.toString() }});
    }

    layout(): string {
        return 'mws';
    }

    get headers() {
        return [
            {
                text: 'Id',
                value: 'id'
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
