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
    async fillInvoices({ commit }) {
        await this.$axios.get('/invoices').then((response) => {
            if (response.status === 200) {
                commit('setInvoices', response.data);
            }
        });
    },
    updateInvoice({}, invoice) {
        return this.$axios.post(`/invoices/${invoice.id}`, invoice);
    },
    addInvoice({}, invoice) {
        return this.$axios.post('/invoices', invoice);
    },
    async getInvoiceItems({ commit }, invoiceId) {
        await this.$axios.get(`/invoices/${invoiceId}/items`).then((response) => {
            if (response.status === 200) {
                commit('setInvoiceItems', response.data)
            }
        }).catch((error) => { console.error(error) });
    },
    addInvoiceItem({}, invoiceItem) {
        return this.$axios.post(`/invoices/${invoiceItem.InvoiceId}/items`, invoiceItem);
    }
};
