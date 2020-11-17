import { shallowMount, createLocalVue } from '@vue/test-utils'
import DataTable from '@/components/customer/datatable.vue'
import Vuetify from 'vuetify'
import CustomersData from '@/assets/data/customers.json'

describe('datatable.vue', () => {
    let wrapper;

    beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(Vuetify);
        wrapper = shallowMount(DataTable, {
            localVue,
            propsData: {
                customers: CustomersData
            }
        });
    });

    test('is a Vue instance', () => {
        let vuetify = new Vuetify();
        const wrapper = shallowMount(DataTable, {
            vuetify,
            propsData: {
                customers: CustomersData
            }
        });
        expect(wrapper.isVueInstance()).toBe(true);
    });
});
