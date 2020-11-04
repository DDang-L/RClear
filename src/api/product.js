import axios from '@/utils/request.js'

/**
 * 查找所有产品的信息
 */

export function productFindAll(params) {

    // 与vue页面中的页码和每页条数变化有关。要注意数据模型中的page要从1开始。
    let obj = { ...params }
    obj.page--;

    // 删除name
    for (let key in obj) {
        if (obj[key] === 0) {
            continue;
        }
        if (!obj[key]) {
            delete obj[key]
        }
    }
    return axios.post('/product/query', obj)
}

// vue页面的from新增或者修改的数据
export function saveOrUpdate(params) {
    return axios.post('/product/saveOrUpdate', params)
}

// 通过id去删除产品
export function deleteById(params) {
    return axios.get('/product/deleteById', { params })
}

// 通过ids批量删除产品
export function batchDelete(params) {
    return axios.post('/product/batchDelete', params)
}

// 通过id查询产品信息
export function productFindById(params) {
    return axios.get('/product/findById', { params })
}






