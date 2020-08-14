export const comanda = {
    state: {
        pisos: null,
        familias: null,
        mesaActual: null,
        idMesaActual: null,
    },
    getters: {
        getPISOS: (state) => {
            return state.pisos;
        },
        getFAMILIAS: (state) => {
            return state.familias;
        },
        get_MESA_ACTUAL: (state) => {
            return state.mesaActual;
        },
        get_ID_MESA_ACTUAL: (state) => {
            return state.idMesaActual;
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
        SET_MESA_ACTUAL(state, value) {
            state.mesaActual = value;
        },
        SET_ID_MESA_ACTUAL(state, value) {
            state.idMesaActual = value;
        },
    },
    modules: {}
}