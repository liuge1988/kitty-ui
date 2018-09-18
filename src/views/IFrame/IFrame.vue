<template>
  <div class="iframe-container">
    <iframe :src="src" scrolling="auto" frameborder="0" class="frame">
    </iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: ''
    }
  },
  methods: {
    // 获取路径
    resetSrc: function (url) {
      this.src = this.global.baseUrl + url
    }
  },
  mounted(){
    this.resetSrc(this.$store.state.iframe.iframeUrl)
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        // 如果是跳转到嵌套页面，切换iframe的url
        this.resetSrc(val.path)
      }
    }
  }
}
</script>

<style lang="scss">
.iframe-container {
  position: absolute;
  top: 60px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin-top: -29px;
  .frame {
    position: relative;
    top: 0px;
    width: 100%;
    height: 100%;
  }
}
</style>
