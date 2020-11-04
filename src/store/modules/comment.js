import { commentFindAll } from '@/api/comment.js'

// 配置vuex结构
export default {
    namespaced: true,
    state: {
        totaldata: {},
    },
    getters: {
        total: state => state.totaldata.total,
        commentDotal: state => state.totaldata.list,
    },
    mutations: {
        changeTotalData(state, data) {
            state.totaldata = data;
        }
    },
    actions: {
        commentFindAll({ commit }, payload) {
            commentFindAll(payload).then((res) => {
                commit('changeTotalData', res.data)
            })
        }
    },

}