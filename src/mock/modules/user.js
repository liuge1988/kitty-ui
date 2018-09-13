/* 
 * 用户管理模块
 */

// 保存
export function save() {
  return {
    url: 'user/save',
    type: 'post',
    data: {
      "code": 200,
      "msg": null,
      "data": 1
    }
  }
}
// 批量删除
export function batchDelete() {
  return {
    url: 'user/delete',
    type: 'post',
    data: {
      "code": 200,
      "msg": null,
      "data": 1
    }
  }
}
// 分页查询
let findPageData = {
  "code": 200,
  "msg": null,
  "data": {}
}
let pageNum = 3
let pageSize = 8
let totalSize = 42
let totalPages = 9
findPageData.data.pageNum = pageNum
findPageData.data.pageSize = pageSize
findPageData.data.totalSize = totalSize
findPageData.data.totalPages = totalPages
let content = []
for(let i=0; i<pageSize; i++) {
  let obj = {}
  obj.id = i + 1
  obj.name = 'kitty' + (i + 1)
  obj.password = '9ec9750e709431dad22365cabc5c625482e574c74adaebba7dd02f1129e4ce1d'
  obj.salt = 'YzcmCZNvbXocrsz9dm8e'
  obj.email = 'kitty' + (i + 1) +'@qq.com'
  obj.mobile = '18688982323'
  obj.status = 1
  obj.deptId = 12
  obj.deptName = 'Dev'
  content.push(obj)
}
findPageData.data.content = content
export function findPage(params) {
  return {
    url: 'user/findPage',
    type: 'post',
    data: findPageData
  }
}
// 查找用户的菜单权限标识集合
export function findPermissions() {
  return {
    url: 'user/findPermissions',
    type: 'get',
    data: {
      "code": 200,
      "msg": null,
      "data": 1
    }
  }
}