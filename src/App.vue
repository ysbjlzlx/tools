<template>
  <el-container style="min-height: 100vh">
    <el-header>
      <Nav></Nav>
    </el-header>
    <el-main style="flex: 1">
      <router-view></router-view>
    </el-main>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>
<script setup>
import { ElContainer, ElHeader, ElMain, ElFooter } from "element-plus";
import Nav from "./views/layouts/Nav.vue";
import Footer from "./views/layouts/Footer.vue";
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  color: #000000da;
  min-height: 100vh;
}
body {
  display: flex;
  flex-flow: column;
  min-height: 100vh;
}
</style>
