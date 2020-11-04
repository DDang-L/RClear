import { waiterFindAll, waiterSaveOrUpdate, findWaiterById, detailsShou, waiterQueryTiXian } from '@/api/waiter.js'
import { Notification } from 'element-ui';
export default {
    namespaced: true,
    state: {
        // 分页查询顾客信息
        totalData: {},
        // 通过Id查找员工信息
        waiterInfo: {},
        // 收益信息
        waiterProfit: [],

        // 提现信息
        waiterTiXian: {},
    },
    getters: {
        total: state => state.totalData.total,
        waiterData: state => state.totalData.list,
        waiterTiXianTotal: state => state.waiterTiXian.total,
        waiterTiXianData: state => state.waiterTiXian.list,
    },
    mutations: {
        changeTotalDat(state, data) {
            state.totalData = data
        },
        changeWaiterId(state, data) {
            state.waiterInfo = data
        },
        changeDetailsShouId(state, data) {
            state.waiterProfit = data
        },

        changeWaiterTiXian(state, data) {
            state.waiterTiXian = data
        },

    },
    actions: {
        // 分页查询员工信息
        waiterFindAll({ commit }, payload) {
            waiterFindAll(payload).then((res) => {
                commit('changeTotalDat', res.data)
            })
        },

        // 保存顾客信息
        async waiterSaveOrUpdate({ dispatch }, payload) {
            let res = await waiterSaveOrUpdate(payload.form)
            if (res.status === 200) {
                Notification({
                    type: 'success',
                    title: '成功',
                    message: '保存成功',
                })
                // 查找数据 找当前页数据
                dispatch('waiterFindAll', payload.queryParams);
                // 将来调用saveOrUpdate的payload参数是{form:{},queryParams:queryParams}

            } else {
                Notification({
                    type: 'false',
                    title: '失败',
                    message: '保存失败',
                })
            }
        },

        // 根据员工Id去查询
        async findWaiterById({ commit }, payload) {
            let res = await findWaiterById(payload)
            commit('changeWaiterId', res.data)
        },
        // 根据员工Id去查询收益信息
        async detailsShou({ commit }, payload) {
            let res = await detailsShou(payload)
            commit('changeDetailsShouId', res.data)
        },
        // 分页查询员工提现信息
        async waiterQueryTiXian({ commit }, payload) {
            let res = await waiterQueryTiXian(payload)
            commit('changeWaiterTiXian', res.data)
        },
    }


}