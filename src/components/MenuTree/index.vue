<template>
  <el-submenu v-if="menu.children && menu.children.length >= 1" :index="menu.id + ''">
    <template slot="title">
      <i :class="menu.icon"></i>
      <span slot="title">{{menu.name}}</span>
    </template>
    <MenuTree v-for="item in menu.children" :key="item.id" :menu="item"></MenuTree>
  </el-submenu>
  <el-menu-item v-else :index="menu.id + ''" @click="handleRoute(menu)">
    <i :class="menu.icon"></i>
    <span slot="title">{{menu.name}}</span>
  </el-menu-item>
</template>

<script>
import { getIFrameUrl } from '@/utils/iframe'
export default {
  name: 'MenuTree',
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleRoute (menu) {
    // 如果是嵌套页面，转换成iframe的url
    let url = getIFrameUrl(menu.url)
    if(!url) {
      url = menu.url
    }
    // 通过菜单URL跳转至指定路由
    this.$router.push("/")
    this.$router.push(url)
    }
  }
}
</script>