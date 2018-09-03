import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

import app from './modules/app'
import menu from './modules/menu'

const store = new vuex.Store({
    modules: {
        app: app,
        menu: menu
    }
})

export default store