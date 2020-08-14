export const auth = {
    state: {
        pin: null,
        loginState: false,
        userName: null,
        userId: null,
    },
    getters: {
        getPIN: (state) => {
            return state.pin;
        },
        getLOGIN_STATE: (state) => {
            return state.loginState;
        },
        getUSERNAME: (state) => {
            return state.userName;
        },
        getUSERID: (state) => {
            return state.userId;
        },
    },
    actions: {},
    mutations: {
        SET_PIN(state, value) {
            state.pin = value;
        },
        SET_LOGIN_STATE(state, value) {
            state.loginState = value;
        },
        SET_USER_NAME(state, value) {
            state.userName = value;
        },
        SET_USER_ID(state, value) {
            state.userId = value;
        },
    },
    modules: {}
}