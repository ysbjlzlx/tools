<template>
  <el-menu mode="horizontal" router>
    <el-menu-item index="/">Tools</el-menu-item>
    <el-menu-item index="/color">{{ t("nav.color") }}</el-menu-item>
    <el-menu-item index="/datetime"> Datetime </el-menu-item>
    <el-submenu index="/encode">
      <template #title>{{ t("nav.encode") }}</template>
      <el-menu-item index="/encode/base64">{{ t("nav.base64") }}</el-menu-item>
      <el-menu-item index="/encode/urlencode">
        {{ t("nav.urlencode") }}
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/hash">
      {{ t("nav.hash") }}
    </el-menu-item>
    <el-submenu index="/image">
      <template #title>{{ t("nav.image") }}</template>
      <el-menu-item index="/image/placeholder">
        {{ t("nav.placeholder") }}
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/json">
      {{ t("nav.json") }}
    </el-menu-item>
    <el-submenu index="/transform">
      <template #title>{{ t("nav.transform") }}</template>
      <el-menu-item index="/transform/json2yaml"> JSON2YAML </el-menu-item>
    </el-submenu>
    <el-submenu index="/password">
      <template #title>
        {{ t("nav.development") }}
      </template>
      <el-menu-item index="/password/make"> Make Password </el-menu-item>
    </el-submenu>
    <el-menu-item>
      <el-select v-model="state.lang" v-on:change="onLangChanged">
        <el-option value="zh-Hans-CN" label="简体中文" />
        <el-option value="en" label="English" />
      </el-select>
    </el-menu-item>
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
</script>
