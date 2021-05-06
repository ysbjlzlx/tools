<template>
  <el-menu mode="horizontal" @select="handleMenuSeclect">
    <el-menu-item index="1" :route="{ path: '/' }">Tools</el-menu-item>
    <el-menu-item index="2" :route="{ path: '/color' }">{{ t("nav.color") }}</el-menu-item>
    <el-menu-item index="3" :route="{ path: '/datetime' }"> Datetime </el-menu-item>
    <el-submenu index="4">
      <template #title>{{ t("nav.encode") }}</template>
      <el-menu-item index="4-1" :route="{ path: '/encode/base64' }">{{ t("nav.base64") }}</el-menu-item>
      <el-menu-item index="4-2" :route="{ path: '/encode/urlencode' }">
        {{ t("nav.urlencode") }}
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="5" :route="{ path: '/hash' }">
      {{ t("nav.hash") }}
    </el-menu-item>
    <el-submenu index="6">
      <template #title>{{ t("nav.image") }}</template>
      <el-menu-item index="6-1" :route="{ path: '/image/placeholder' }">
        {{ t("nav.placeholder") }}
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="7" :route="{ path: '/json' }">
      {{ t("nav.json") }}
    </el-menu-item>
    <el-submenu index="8">
      <template #title>{{ t("nav.transform") }}</template>
      <el-menu-item index="8-1" :route="{ path: '/transform/json2yaml' }"> JSON2YAML </el-menu-item>
    </el-submenu>
    <el-submenu index="9">
      <template #title>
        {{ t("nav.development") }}
      </template>
      <el-menu-item index="9-1" :route="{ path: '/password/make' }"> Make Password </el-menu-item>
    </el-submenu>
    <el-submenu index="lang" style="float: right">
      <template #title>
        {{ state.lang }}
      </template>
      <el-menu-item index="zh-Hans-CN">简体中文</el-menu-item>
      <el-menu-item index="en">English</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script setup>
import { reactive, onMounted, watch } from "vue";
import { ElMenu, ElMenuItem, ElSubmenu, ElSelect, ElOption } from "element-plus";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
const router = useRouter();

const state = reactive({
  lang: "zh-Hans-CN",
});
const { t } = useI18n({ useScope: "global" });

onMounted(() => {
  const lang = window.localStorage.getItem("lang");
  if (lang) {
    state.lang = lang;
  }
});
watch(
  () => state.lang,
  (val) => {
    window.localStorage.setItem("lang", val);
  }
);
function onLangChanged(val) {
  router.go(0);
}
function handleMenuSeclect(index, indexPath, { route }) {
  if (route) {
    router.push(route);
  } else if ("lang" === indexPath.shift()) {
    state.lang = index;
    onLangChanged();
  }
}
</script>
