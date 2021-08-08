<template>
  <q-layout view="HHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round dense icon="menu" class="q-mr-sm" @click="$store.commit('app/switch')" />
        <q-avatar>
          <img src="/apple-touch-icon.png" />
        </q-avatar>
        <q-toolbar-title>Tools</q-toolbar-title>
        <q-btn type="a" href="https://github.com/ysbjlzlx/tools" target="_blank" flat dense label="GitHub" />
      </q-toolbar>
    </q-header>
    <q-drawer v-model="expand" :width="200" show-if-above :breakpoint="700" elevated>
      <q-scroll-area class="fit">
        <SideBar />
      </q-scroll-area>
    </q-drawer>
    <q-page-container class="q-ml-md q-mr-md">
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { computed } from "vue";
import SideBar from "./SideBar.vue";
import { useStore } from "vuex";
const $store = useStore();

const expand = computed({
  get() {
    return $store.state.app.nav.expand;
  },
  set(val) {
    $store.commit("app/switch");
  },
});
</script>
