export const state = () => ({
    invoices: [],
    invoiceItems: []
});

export const getters = {
    getInvoices: (state) => {
        return state.invoices;
    },
    getInvoice: (state) => (id) => {
        return state.invoices.find((s) => s.id === id);
    },
    getInvoiceItems: (state) => {
        return state.invoiceItems;
    },
    getInvoiceItem: (state) => (id) => {
        return state.invoiceItems.find((i) => i.id === id);
    }
};

export const mutations = {
    setInvoices(state, payload) {
        state.invoices = payload;
    },
    setInvoiceItems(state, payload) {
        state.invoiceItems = payload;
    }
};

export const actions = {
    async getInvoicesSetToStore({ commit }) {
        const response = await this.$axios.get('/invoices');

        if (response.status === 200) {
            commit('setInvoices', response.data);
        }
    },
    updateInvoice({}, invoice) {
        return this.$axios.post(`/invoices/${invoice.id}`, invoice);
    },
    addInvoice({}, invoice) {
        return this.$axios.post('/invoices', invoice);
    },
    async getInvoiceItemsSetToStore({ commit }, invoiceId) {
        const response = await this.$axios.get(`/invoices/${invoiceId}/items`);

        if (response.status === 200) {
            commit('setInvoiceItems', response.data)
        }
    },
    addInvoiceItem({}, invoiceItem) {
        return this.$axios.post(`/invoices/${invoiceItem.InvoiceId}/items`, invoiceItem);
    },
    async getInvoiceItem({}, invoice) {
        return await this.$axios.get(`/invoices/${invoice.id}/items/${invoice.itemId}`);
    },
    async updateInvoiceItem({}, invoice) {
        return await this.$axios.post(`/invoices/${invoice.item.invoiceId}/items/${invoice.id}`, invoice.item);
    }
};
