const state = {
    users: [],
    status: ''
}

const getters = {
    getUsers: state => state.users
}

const actions = {
    fetchUsers: ({commit}) => {
        commit('USERS_REQUEST')
        return new Promise((resolve, reject) => {
            axios('user').then(resp => {
                commit('FETCH_USERS', resp.data.data)
                commit('USERS_SUCCESS')
                resolve(resp)
            }).catch(err => {
                commit('USERS_ERROR')
                reject(err)
            })
        })
    }
}

const mutations = {
    FETCH_USERS: (state, users) => {
        state.users = users
    },
    USERS_REQUEST: (state) => {
        state.status = 'loading'
    },
    USERS_SUCCESS: (state) => {
        state.status = 'success'
    },
    USERS_ERROR: (state) => {
        state.status = 'error'
    }

}

export default {
    state,
    getters,
    mutations,
    actions
}