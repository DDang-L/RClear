import axios from '@/utils/request.js'

// 分页查找订单信息
export function orderQueryPage(params) {

    let obj = { ...params };
    obj.page--;
    return axios.post('/order/queryPage', obj);
}

// 查询订单全部信息
export function orderQueryInfoStatus(params) {
    return axios.get('/order/query', { params })
}

// 根据id查询订单信息
export function orderFindById(params) {
    return axios.get('/order/findById', { params })
}

// 派单
export function sendOrder(params) {
    return axios.get('/order/sendOrder', { params })
}