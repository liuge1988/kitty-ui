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
      getSrc: function (url) {
        return this.global.baseURL + url
      }
    },
    mounted() {
      this.src = this.getSrc("druid/login.html")
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
