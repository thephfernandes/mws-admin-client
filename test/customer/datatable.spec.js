import { shallowMount } from '@vue/test-utils'
import DataTable from '@/components/customer/datatable.vue'
import Vuetify from 'vuetify'
import Vue from 'vue'
import CustomersData from '@/assets/data/customers.json'

Vue.use(Vuetify);

describe('datatable.vue', () => {
    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify();

    });

    test('is a Vue instance', () => {
        const wrapper = shallowMount(DataTable, {
            vuetify,
            propsData: {
                customers: CustomersData
            }
        });
        expect(wrapper.vm).toBeTruthy();
    });
});
