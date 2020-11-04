import axios from '@/utils/request.js'

// 文件上传
export function fileUpload(params) {
    return axios.post('/file/upload', params)
}


