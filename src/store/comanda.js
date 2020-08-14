export const comanda = {
    state: {
        pisos: null,
        familias: null,
    },
    getters: {
        getPISOS: (state) => {
            return state.pisos;
        },
        getFAMILIAS: (state) => {
            return state.familias;
        },
    },
    actions: {},
    mutations: {
        SET_PISOS(state, value) {
            state.pisos = value;
        },
        SET_FAMILIAS(state, value) {
            state.familias = value;
        },
    },
    modules: {}
}