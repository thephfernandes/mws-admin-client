import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class DatatableLoading extends Vue {
    namespace: string = 'datatable-loading';
    loading: boolean = true;
}
