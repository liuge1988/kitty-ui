<template>
  <div id="main-container" class="container" :class="$store.state.app.collapse?'menu-bar-collapse-width':'menu-bar-width'">
    <!-- 标签页 -->
    <el-tabs v-model="mainTabsActiveName" :closable="true"
      @tab-click="selectedTabHandle" @tab-remove="removeTabHandle">
      <el-dropdown class="tabs-tools" :show-timeout="0" trigger="click">
        <el-button class="tabs-tools">
          关闭标签 <i class="el-icon-arrow-down"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="tabsCloseCurrentHandle">关闭当前标签页</el-dropdown-item>
          <el-dropdown-item @click.native="tabsCloseOtherHandle">关闭其它标签页</el-dropdown-item>
          <el-dropdown-item @click.native="tabsCloseAllHandle">关闭全部标签页</el-dropdown-item>
          <el-dropdown-item @click.native="tabsRefreshCurrentHandle">刷新当前标签页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tab-pane v-for="item in mainTabs"
        :key="item.name" :label="item.title" :name="item.name">
      </el-tab-pane>
    </el-tabs>
    <!-- 主内容区域 -->
    <keep-alive>
      <transition name="fade" mode="out-in">
          <router-view class="content"></router-view>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    mainTabs: {
      get () { return this.$store.state.tab.mainTabs },
      set (val) { this.$store.commit('updateMainTabs', val) }
    },
    mainTabsActiveName: {
      get () { return this.$store.state.tab.mainTabsActiveName },
      set (val) { this.$store.commit('updateMainTabsActiveName', val) }
    }
  },
  methods: {
    // tabs, 选中tab
    selectedTabHandle (tab) {
      tab = this.mainTabs.filter(item => item.name === tab.name)
      if (tab.length >= 1) {
        this.$router.push({ name: tab[0].name })
      }
    },
    // tabs, 删除tab
    removeTabHandle (tabName) {
      this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
      if (this.mainTabs.length >= 1) {
        // 当前选中tab被删除
        if (tabName === this.mainTabsActiveName) {
          this.$router.push({ name: this.mainTabs[this.mainTabs.length - 1].name }, () => {
            this.mainTabsActiveName = this.$route.name
          })
        }
      } else {
        this.$router.push("/")
      }
    },
    // tabs, 关闭当前
    tabsCloseCurrentHandle () {
      this.removeTabHandle(this.mainTabsActiveName)
    },
    // tabs, 关闭其它
    tabsCloseOtherHandle () {
      this.mainTabs = this.mainTabs.filter(item => item.name === this.mainTabsActiveName)
    },
    // tabs, 关闭全部
    tabsCloseAllHandle () {
      this.mainTabs = []
      this.$router.push("/")
    },
    // tabs, 刷新当前
    tabsRefreshCurrentHandle () {
      var tempTabName = this.mainTabsActiveName
      this.removeTabHandle(tempTabName)
      this.$nextTick(() => {
        this.$router.push({ name: tempTabName })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 0 8px 8px;
  position: absolute;
  top: 60px;
  left: 0px;
  // background: rgba(56, 5, 114, 0.5);
 .tabs-tools {
    position: fixed;
    top: 60px;
    right: 0;
    z-index: 500;
    height: 40px;
    padding: 0 10px;
    font-size: 14px;
    line-height: 40px;
    cursor: pointer;
  }
  .content {
    margin-bottom: 5px;
    // background: rgba(209, 212, 212, 0.5);
  }
}
.menu-bar-width {
  left: 200px;
}
.menu-bar-collapse-width {
  left: 65px;
}
</style>