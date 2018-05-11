import jwtDecode from 'jwt-decode'

const state = {
    token: localStorage.getItem('user-token') || '',
    status: '',
    user: null
}

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    getUser: state => state.user
}

const actions = {
    authenticate: ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => {
            commit("AUTH_REQUEST");
            axios({url: 'auth/login', data: user, method: 'POST' })
                .then(resp => {
                    const token = resp.data.access_token;
                    localStorage.setItem('user-token', token);
                    axios.defaults.headers.common['Authorization'] = 'bearer ' + token;
                    const decoded = jwtDecode(token);
                    axios({url:'user/' + decoded.user_id + '/personaldata', method: 'GET'}).then(resp =>{
                        commit("SET_USER", resp.data.data);
                    });
                    commit("AUTH_SUCCESS", token);
                    resolve(resp)
                })
                .catch(err => {
                    commit("AUTH_ERROR", err);
                    localStorage.removeItem('user-token');
                    console.log(err);
                    reject(err);
                })
        })
    },
    logout: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit("AUTH_REQUEST");
            commit("AUTH_LOGOUT");
            commit("SET_USER", null);
            localStorage.removeItem('user-token');
            delete axios.defaults.headers.common['Authorization'];
            resolve()

        })
    },
    fetchUser: ({commit}, id) => {
        return new Promise((resolve, reject) => {
            axios({url: '/user/' + id, method: 'GET' })
                .then(resp => {
                    commit("SET_USER");
                    resolve(resp);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        })
    }
}


const mutations = {
    AUTH_REQUEST: (state) => {
        state.status = 'loading';
    },
    AUTH_SUCCESS: (state, token) => {
        state.status = 'success';
        state.token = token;
    },
    AUTH_ERROR: (state) => {
        state.status = 'error';
    },
    AUTH_LOGOUT: (state) => {
        state.token = '';
    },
    SET_USER: (state, user) => {
        state.user = user;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}