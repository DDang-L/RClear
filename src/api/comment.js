import axios from '@/utils/request.js'

export function commentFindAll(params) {

    let obj = { ...params }
    obj.page--
    return axios.post('/comment/query', obj)
}

// 根据id删除评论信息
export function commentDeleteById(params) {
    return axios.get('/comment/deleteById', { params })
}

// 拒绝审核
export function commentRefuseExamine(params) {
    return axios.get('/comment/commentRefuseExamine', { params })
}

// 通过审核
export function commentExamine(params) {
    return axios.get('/comment/commentExamine', { params })
}
