<template>
  <el-container style="min-height: 100vh">
    <el-header style="padding: 0">
      <Nav></Nav>
    </el-header>
    <el-main style="flex: 1">
      <router-view></router-view>
    </el-main>
    <el-footer style="padding: 0">
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>
<script setup>
import Nav from "./views/layouts/Nav.vue";
import Footer from "./views/layouts/Footer.vue";
</script>

<style>
body {
  display: flex;
  flex-flow: column;
  min-height: 100vh;
}
#app {
  min-height: 100vh;
}
</style>
