const state = {
    advertisementsByPage: [],
    page: {}
}

const getters = {
    advertisementsByPage: state => state.advertisementsByPage,
    pagination: state => state.page
}

const actions = {
    getAdvertisementsByPage({commit}, pageNumber){
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
                    resolve(response);

                })
                .catch((error => {
                    console.log(error.statusText);
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
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}