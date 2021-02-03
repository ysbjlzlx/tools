<template>
  <div>
    <header>
      <Nav></Nav>
    </header>
    <main class="container">
      <router-view></router-view>
    </main>
    <footer></footer>
  </div>
</template>
<script setup>
import Nav from "./views/layouts/Nav.vue";
import Footer from "./views/layouts/Footer.vue";
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Noto Color Emoji";
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  color: #000000da;
}
</style>
