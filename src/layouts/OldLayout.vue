<template>
  <q-layout view="HHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round dense icon="menu" class="q-mr-sm" @click="$store.commit('switch')" />
        <q-avatar>
          <img src="/apple-touch-icon.png" />
        </q-avatar>

        <q-toolbar-title>Tools</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer :model-value="expand" :width="200" :breakpoint="300" elevated>
      <q-scroll-area class="fit">
        <SideBar />
      </q-scroll-area>
    </q-drawer>
    <q-page-container class="q-pt-md q-pd-md q-ml-md q-mr-md">
      <router-view></router-view>
    </q-page-container>
    <q-footer elevated>
      <Footer></Footer>
    </q-footer>
  </q-layout>
</template>
<script setup>
import { computed } from "vue";
import Footer from "./Footer.vue";
import SideBar from "./SideBar.vue";
import { useStore } from "vuex";
const $store = useStore();

const expand = computed(() => {
  return $store.state.nav.expand;
});
</script>
