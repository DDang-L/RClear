// 在api中 需要处理网路请求 我们就需要导入axios 
// @ 以根目录的方式定义相对路径 想到与src/
import axios from '@/utils/request.js'
/**
 *查找所有的顾客信息
 *@param Object params
  @returns Promise对象
 */

export function findAll(params) {

    let obj = { ...params };
    obj.page--;

    // 删除status
    for (let key in obj) {
        if (obj[key] === 0) {
            continue;
        }
        if (!obj[key]) {
            delete obj[key]
        }
    }

    return axios.post('/customer/query', obj)
}

// vue页面的form 新增或者修改的数据
export function saveOrUpdate(params) {
    return axios.post('/customer/saveOrUpdate', params)
}

// 通过id删除顾客
export function deleteById(params) {
    return axios.get('/customer/deleteById', { params })
}

// 通过批量删除顾客
export function batchDelete(params) {
    return axios.post('/customer/batchDelete', params)
}

// 通过顾客id查找顾客的基本信息
export function findCustomerById(params) {
    return axios.get('/customer/findCustomerById', { params })
}

