import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
// 导入customer
import customer from './modules/customer'
// 导入produce
import product from './modules/product.js'
// 导入categroy
import categroy from './modules/categroy.js'
// 导入comment
import comment from './modules/comment.js'

import waiter from './modules/waiter.js'
import order from './modules/order.js'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    // customer模块
    customer,
    // produce模块
    product,

    categroy,

    comment,

    waiter,

    order,
  },
  getters
})

export default store
