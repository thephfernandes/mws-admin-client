export const state = () => ({
    invoices: []
});

export const getters = {
    getInvoices: (state) => {
        return state.invoices;
    },
    getInvoice: (state) => (id) => {
        return state.invoices.find((s) => s.id === id);
    },
};

export const mutations = {
    setInvoices(state, payload) {
        state.invoices = payload;
    }
};

export const actions = {
    async fillInvoices({ commit }) {
        await this.$axios.get('/invoices').then((response) => {
            if (response.status === 200) {
                commit('setInvoices', response.data);
            }
        });
    }
};
