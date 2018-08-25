<template>
  <div class="page">
    <h2>Home Page</h2>
    <el-button type="primary" @click="getUser()">获取用户信息</el-button>
    <el-button type="primary" @click="getMenu()">获取菜单信息</el-button>
  </div>
</template>

<script>
  import mock from '@/mock/index.js';
  export default {
    name: 'Home',
    methods: {
      getUser() {
        this.$api.getUser().then(function(res) {
            alert(JSON.stringify(res.data));
          }).catch(function(res) {
            alert(res);
          });
          
      },
      getMenu() {
        this.$api.getUser().then(function(res) {
            alert(JSON.stringify(res.data));
          }).catch(function(res) {
            alert(res);
          });
      }
    }
  }
</script>