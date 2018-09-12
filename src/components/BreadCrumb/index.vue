<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
      <a href="www.baidu.com">{{ item.name }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {

  },
  mounted() {

  }
};
</script>

<style scoped lang="scss">
.breadcrumb {
  padding: 10px;
}
</style>