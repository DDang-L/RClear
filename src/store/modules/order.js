import { orderQueryPage, orderFindById } from '@/api/order.js'

export default {
    namespaced: true,
    state: {
        totalData: {},

        // 根据id查询顾客订单信息
        orderByIdData: {},
    },
    getters: {
        total: state => state.totalData.total,
        orderDotal: state => state.totalData.list,
    },
    mutations: {
        changeTotalData(state, data) {
            state.totalData = data
        },

        changenOrderFindById(state, data) {
            console.log(data, '++++');
            state.orderByIdData = data
        }
    },
    actions: {
        // 分页查找订单信息
        orderQueryPage({ commit }, payload) {
            orderQueryPage(payload).then((res) => {
                commit('changeTotalData', res.data);
            })
        },

        // 根据id查询订单信息
        async orderFindById({ commit }, payload) {
            let res = await orderFindById(payload)
            commit('changenOrderFindById', res.data)
        }
    },
}