import axios from '@/utils/request.js'

// 配置Vuex结构,创建配置对象，在大仓库中导入
// 分页查询员工信息
export function waiterFindAll(params) {
    let obj = { ...params }
    obj.page--;
    return axios.post('/waiter/query', obj)
}

// 保存员工信息
export function waiterSaveOrUpdate(params) {
    return axios.post('/waiter/saveOrUpdate', params)
}

// 通过ID删除服务员信息
export function waiterDeleteById(params) {
    return axios.get('/waiter/deleteById', { params })
}

// 通过id查询员工基本信息
export function findWaiterById(params) {
    return axios.get('/waiter/findWaiterById', { params })
}

// 根据员工id查询员工收益信息
export function detailsShou(params) {
    return axios.get('/waiter/detailsShou', { params })
}

// 分页查询员工提现信息
export function waiterQueryTiXian(params) {
    let obj = { ...params }
    obj.page--;
    return axios.post('/waiter/queryShou', obj)
}

// 查询所有服务员信息
export function waiterFindAllAll() {
    return axios.get('/waiter/findAll')
}

