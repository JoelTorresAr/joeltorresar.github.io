import store from './index'
import axios from 'axios'
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
    actions: {
        BREAK() {
            var ip = store.getters.getIP
            axios
                .get(
                    `${ip}/?nomFun=tb_login&parm_cod=Xyfk8Gixnf&parm_new=0&parm_pin=${store.getters.getPIN}&parm_tipo=M$`
                )
                .then(({ data }) => {
                    console.log('libero')
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },
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