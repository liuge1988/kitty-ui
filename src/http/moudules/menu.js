import axios from '../axios'

/* 
 * 菜单管理模块
 */

export const findNavTree = (params) => {
    return axios({
        url: '/menu/findNavTree',
        method: 'get',
        params
    })
}