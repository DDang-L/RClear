import { productFindAll, saveOrUpdate, productFindById } from '@/api/product.js'
import { Notification } from 'element-ui';
export default {
    namespaced: true,

    state: {
        totalData: {},

        // 通过id查询的产品信息
        productId: {},
    },
    getters: {
        // 总条数
        total: state => state.totalData.total,
        // 每页产品信息
        productData: state => state.totalData.list,
    },
    mutations: {
        changeTotaData(state, data) {
            state.totalData = data
        },

        changeProductId(state, data) {
            state.productId = data
        }
    },
    actions: {
        productFindAll({ commit }, payload) {
            // 调用传入的productFindAll方法中的请求
            productFindAll(payload).then((res) => {
                commit('changeTotaData', res.data);
            })
        },

        /**
         * 新增或修改产品信息
         */
        // 接收数据，发请求，请求成功提示用户保存成功，处理page,分发findAll()动作
        async saveOrUpdate({ dispatch }, payload) {
            let res = await saveOrUpdate(payload.form);
            // 保存成功
            if (res.status === 200) {
                Notification({
                    type: 'success',
                    title: '成功',
                    message: '保存成功',
                })

                // 查找数据 找当前数据
                dispatch('productFindAll', payload.queryParams);
                // 将来调用saveOrUpdate的payload参数是{form:{},queryParams:queryParams}

            } else {
                Notification({
                    type: 'success',
                    title: '失败',
                    message: '保存失败',
                })
            }
        },

        // 通过id去查询产品信息
        async productFindById({ commit }, payload) {
            let res = await productFindById(payload)
            commit('changeProductId', res.data)
        }
    },
}

















