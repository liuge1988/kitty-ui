<template>
  <div class="iframe-container" style="width:99%;margin-top:-15px;">
    <iframe :src="src" scrolling="auto" frameborder="0" class="frame" :onload="onloaded()">
    </iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: "",
      loading: null
    };
  },
  methods: {
    // 获取路径
    resetSrc: function(url) {
      this.src = url
      this.load()
    },
    load: function() {
      this.loading = this.$loading({  
        lock: true,
        text: "loading...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.5)",
        // fullscreen: false,
        target: document.querySelector("#main-container ")
      })
    },
    onloaded: function() {
      this.loading.close()
    }
  },
  mounted() {
    this.resetSrc(this.$store.state.iframe.iframeUrl);
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        // 如果是跳转到嵌套页面，切换iframe的url
        this.resetSrc(this.$store.state.iframe.iframeUrl);
      }
    }
  }
};
</script>

<style lang="scss">
.iframe-container {
  position: absolute;
  top: 60px;
  bottom: 0px;
  .frame {
    width: 100%;
    height: 100%;
  }
}
</style>
