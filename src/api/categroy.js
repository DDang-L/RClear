import axios from '@/utils/request.js'

// 分页查询栏目信息,用在category.vue页面
export function categroyQueryFindAll(params) {
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
    return axios.post('/category/query', obj)
}

// 查询所有栏目信息，用在根据产品的模态框上
export function categoryFindAll(params) {
    return axios.get('/category/findAll', { params })
}

// 确定按钮保存栏目信息
export function categorySaveOrUpdate(params) {
    return axios.post('/category/saveOrUpdate', params)
}

// 通过Id单个删除栏目信息
export function categoryDeleteById(params) {
    return axios.get('/category/deleteById', { params })
}

// 批量删除栏目信息
export function categoryBatchDelete(params) {
    return axios.post('/category/batchDelete', params)
}