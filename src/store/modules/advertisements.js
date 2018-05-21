const state = {
    advertisementsByPage: [],
    page: {},
    status: ''
}

const getters = {
    advertisementsByPage: state => state.advertisementsByPage,
    pagination: state => state.page,
    advertsStatus: state => state.status
}

const actions = {
    getAdvertisementsByPage: ({commit}, pageNumber) => {
        commit('ADV_REQUEST');
        return new Promise((resolve, reject) => {
            axios('advertisement?page=' + pageNumber).then((response) => {

                let page = {};

                page.first_page_url = response.data.first_page_url;
                page.last_page_url = response.data.last_page_url;
                page.next_page_url = response.data.next_page_url;
                page.prev_page_url = response.data.prev_page_url;
                page.from = response.data.from;
                page.to = response.data.to;
                page.last_page = response.data.last_page;
                page.current_page = response.data.current_page;

                commit("FETCH_PAGE", page);
                commit("FETCH_ADVERTISEMENTS", response.data.data);
                commit('ADV_SUCCESS');
                resolve(response);

                })
                .catch((error => {
                    commit('ADV_ERROR');
                    reject(error);
                }));
        });
    },
    searchAdvertisement: ({commit}, query,pageNumber) => {
        return new Promise((resolve, reject) => {
            commit('ADV_REQUEST');
            axios('search?' + 'query=' + query + '&page=' + pageNumber).then((response) => {
                let page = {};

                page.first_page_url = response.data.first_page_url;
                page.last_page_url = response.data.last_page_url;
                page.next_page_url = response.data.next_page_url;
                page.prev_page_url = response.data.prev_page_url;
                page.from = response.data.from;
                page.to = response.data.to;
                page.last_page = response.data.last_page;
                page.current_page = response.data.current_page;

                commit("FETCH_PAGE", page);
                commit("FETCH_ADVERTISEMENTS", response.data.data);
                commit('ADV_SUCCESS');
                resolve(response);

            })
            .catch((error => {
                commit('ADV_ERROR');
                reject(error);
            }));
        });
    }
}

const mutations = {
    FETCH_PAGE(state, page){
        state.page = page;
    },

    FETCH_ADVERTISEMENTS(state, advertisement){
        state.advertisementsByPage = advertisement;
    },
    ADV_REQUEST(state){
        state.status = 'loading';
    },
    ADV_SUCCESS(state){
        state.status = 'success';
    },
    ADV_ERROR(state){
        state.status = 'error';
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}