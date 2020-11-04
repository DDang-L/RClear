// 导入api内的方法或者axios
import { findAll, saveOrUpdate, findCustomerById } from "@/api/customer.js"
import { Notification } from 'element-ui';
// 导入api内的findByCustomerId()
import { findByCustomerId as findAddressById } from '@/api/address.js'
import { orderQueryPage } from '@/api/order.js'

// 配置Vuex结构
export default {
  // vuex中的store分成模块来管理 需要在index.js中引入每一个Vuex模块进行配置 为了解决不同模块命名冲突的问题  将不同模块的namespaced 全部开启 之后 在不同的页面中再使用getters，actions，mutations，state的时候 需要根据不同的模块名来获取
  namespaced: true,

  state: {
    // 获取顾客信息的时候后台总数据
    totaldata: {},

    // 顾客地址信息
    addressData: [],

    // 根据顾客id后保存顾客订单信息
    coustomerOrderData: [],

    // 通过Id查找顾客基本信息
    customerInfo: {},
  },
  getters: {
    // 总条数
    total: state => state.totaldata.total,
    // 每页的顾客信息
    customerData: state => state.totaldata.list,
  },
  mutations: {
    changeTotalData(state, data) {
      state.totaldata = data;
    },
    // 顾客地址信息
    changeAddressData(state, data) {
      state.addressData = data
    },

    // 修改顾客id后保存顾客订单信息
    changeCoustomerOrderData(state, data) {
      state.coustomerOrderData = data
    },

    // 通过顾客Id查找顾客基本信息
    changeCustomerID(state, data) {
      state.customerInfo = data
    }

  },
  actions: {
    /**
     * 查找顾客信息
     */
    findAll({ commit }, payload) {
      // 调用传入的findAll方法
      findAll(payload).then((res) => {
        // 如果页码超了范围处理一下 1234 10
        // 对数据进行处理 payload.page页面点页码  payload.pageSize  res.data.total
        // Math.ceil()向上取整
        let max = Math.ceil(res.data.total / payload.pageSize)
        // 设置删除最后一页只有一条数据的时候，把页面的，然后再发送请求。
        if (payload.page > max) {
          payload.page = max;
          findAll(payload).then((res) => {
            commit('changeTotalData', res.data)
          })
        } else {
          commit('changeTotalData', res.data)

        }
      })
    },

    /**
     * 新增或修改顾客信息
     */
    // 接收数据，发请求，请求成功提示用户保存成功，处理page,分发findAll()动作
    async saveOrUpdate({ dispatch }, payload) {
      // payload 内有form属性，是表单的数据
      let res = await saveOrUpdate(payload.form);
      // 上面请求成功，则走到下面这
      // 保存成功
      if (res.status === 200) {
        Notification({
          type: 'success',
          title: '成功',
          message: '保存成功',
        })
        // 查找数据 找当前页数据
        dispatch('findAll', payload.queryParams);
        // 将来调用saveOrUpdate的payload参数是{form:{},queryParams:queryParams}

      } else {
        Notification({
          type: 'false',
          title: '失败',
          message: '保存失败',
        })
      }

    },

    // 详情页面：通过顾客id找地址信息:提交突变，改变仓库中的地址信息
    async findAddressById({ commit }, payload) {
      let res = await findAddressById(payload)
      // 保存数据到仓库
      commit('changeAddressData', res.data)
    },

    // 详情页面根据顾客id查找顾客订单信息
    async orderQueryPage({ commit }, payload) {
      let res = await orderQueryPage(payload)
      commit('changeCoustomerOrderData', res.data)
    },

    async findCustomerById({ commit }, payload) {
      let res = await findCustomerById(payload)
      commit('changeCustomerID', res.data)
    }

  }
}