export default {
    state: {
        iframeUrl: []   // 嵌套页面路由路径
    },
    getters: {
    },
    mutations: {
        setIFrameUrl(state, iframeUrl){  // 设置iframeUrl
            state.iframeUrl = iframeUrl
        }
    },
    actions: {
    }
}