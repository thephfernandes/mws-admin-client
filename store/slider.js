export const state = () => ({
    list: []
})

export const mutations = {
    add(state, { slider }) {
        state.list.push(slider);
    }
}
