<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Tools</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/color">{{ t("nav.color") }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/datetime">Datetime</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">{{ t("nav.encode") }}</a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="dropdown-item" to="/encode/base64">{{ t("nav.base64") }}</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/encode/urlencode">{{ t("nav.urlencode") }}</router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/hash">{{ t("nav.hash") }}</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{{ t("nav.image") }}</a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="dropdown-item" to="/image/placeholder">{{ t("nav.placeholder") }}</router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/json">{{ t("nav.json") }}</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{{ t("nav.development") }}</a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="dropdown-item" to="/transform/json2yaml">JSON2YAML</router-link>
              </li>
            </ul>
          </li>
        </ul>
        <div class="d-flex">
          <select class="form-select" v-model="state.lang" @change="onLangChanged()" aria-label="Language select">
            <option value="zh-Hans-CN">简体中文</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { reactive, onMounted, watch } from "vue";
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
function onLangChanged() {
  router.go(0);
}
</script>
