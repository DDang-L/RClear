import { categroyQueryFindAll, categoryFindAll, categorySaveOrUpdate } from '@/api/categroy.js'
import { Notification } from 'element-ui';

// 配置Vuex结构
export default {
    namespaced: true,

    state: {
        // 分页查询栏目的所有信息
        totalData: {},

        // 栏目所有信息
        categoryData: [],
    },
    getters: {
        // 总条数
        total: state => state.totalData.total,
        // 每页顾客信息
        categroyData: state => state.totalData.list,

    },
    mutations: {
        changeTotalData(state, data) {
            state.totalData = data;
        },
        changeCategoryData(state, data) {
            state.categoryData = data
        }

    },
    actions: {
        // 分页查询栏目信息
        categroyQueryFindAll({ commit }, payload) {
            categroyQueryFindAll(payload).then((res) => {
                commit('changeTotalData', res.data)
            })
        },
        // 查找所有栏目的信息
        async categoryFindAll({ commit }, payload) {
            let res = await categoryFindAll(payload)
            commit('changeCategoryData', res.data)
        },

        // 确定保存栏目信息
        async categorySaveOrUpdate({ dispatch }, payload) {
            // payload 内有form属性，是表单的数据
            let res = await categorySaveOrUpdate(payload.form)
            // 保存成功
            if (res.status === 200) {
                Notification({
                    type: 'success',
                    title: '成功',
                    message: '保存成功',
                })

                // 查找数据 找当前数据
                dispatch('categroyQueryFindAll', payload.queryParams);
                // 将来调用saveOrUpdate的payload参数是{form:{},queryParams:queryParams}

            } else {
                Notification({
                    type: 'success',
                    title: '失败',
                    message: '保存失败',
                })
            }
        }


    },

}
