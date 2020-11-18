import { shallowMount, mount } from '@vue/test-utils'
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

    test('Component renders', () => {
        const wrapper = shallowMount(DataTable, {
            vuetify,
            propsData: {
                customers: CustomersData
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('Renders reset filters button',   () => {
        const wrapper = shallowMount(DataTable, {
            vuetify,
            propsData: {
                customers: CustomersData
            }
        });
        const btnResetFilters =  wrapper.find('#test-resetFilters');
        expect(btnResetFilters.exists()).toBe(true);
    });

    test('Renders new customer button', () => {
        const wrapper = shallowMount(DataTable, {
            vuetify,
            propsData: {
                customers: CustomersData
            }
        });
        const btnNewCustomer =  wrapper.find('#test-newCustomer');
        expect(btnNewCustomer.exists()).toBe(true);
    });

    test('Renders country select', () => {
        const wrapper = shallowMount(DataTable, {
            vuetify,
            propsData: {
                customers: CustomersData
            }
        });
        const countrySelect =  wrapper.find('#test-countrySelect');
        expect(countrySelect.exists()).toBe(true);
    });

    test('Renders search field', () => {
        const wrapper = shallowMount(DataTable, {
            vuetify,
            propsData: {
                customers: CustomersData
            }
        });
        const searchField =  wrapper.find('#test-search');
        expect(searchField.exists()).toBe(true);
    });
});
