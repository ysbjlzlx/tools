<template>
  <q-layout view="HHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round dense icon="menu" class="q-mr-sm" />
        <q-avatar>
          <img src="/apple-touch-icon.png" />
        </q-avatar>

        <q-toolbar-title>Tools</q-toolbar-title>

      </q-toolbar>
    </q-header>
    <q-drawer v-bind:value="true" :width="200" :breakpoint="700" show-if-above elevated>
      <q-scroll-area class="fit">
        <SideBar />
      </q-scroll-area>
    </q-drawer>
    <q-page-container class="q-pt-md q-pd-md q-ml-md q-mr-md">
      <router-view></router-view>
    </q-page-container>
    <q-footer elevated>
      <Footer />
    </q-footer>
  </q-layout>
</template>
<script setup>
import Footer from "./Footer.vue";
import SideBar from "./SideBar.vue";
</script>
