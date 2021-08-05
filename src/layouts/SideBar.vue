<template>
  <div>
    <q-list>
      <q-item :to="{ path: '/' }" exact>
        <q-item-section>Tools</q-item-section>
      </q-item>
      <q-item :to="{ path: '/color' }">
        <q-item-section>{{ t("nav.color") }}</q-item-section>
      </q-item>
      <q-item :to="{ path: '/datetime' }">
        <q-item-section>Datetime</q-item-section>
      </q-item>
      <q-expansion-item expand-separator :label="t('nav.encode')">
        <q-item :to="{ path: '/encode/base64' }">
          <q-item-section>{{ t("nav.base64") }}</q-item-section>
        </q-item>
        <q-item :to="{ path: '/encode/urlencode' }">
          <q-item-section>{{ t("nav.urlencode") }}</q-item-section>
        </q-item>
      </q-expansion-item>
      <q-item :to="{ path: '/hash' }">
        <q-item-section>{{ t("nav.hash") }}</q-item-section>
      </q-item>
      <q-expansion-item expand-separator :label="t('nav.image')">
        <q-item :to="{ path: '/image/placeholder' }">
          {{ t("nav.placeholder") }}
        </q-item>
        <q-item :to="{ path: '/image/qrcode' }">
          <q-item-section>二维码</q-item-section>
        </q-item>
      </q-expansion-item>
      <q-item :to="{ path: '/json' }">
        <q-item-section>{{ t("nav.json") }}</q-item-section>
      </q-item>
      <q-expansion-item expand-separator :label="t('nav.transform')">
        <q-item :to="{ path: '/transform/json2yaml' }">
          <q-item-section>JSON2YAML</q-item-section>
        </q-item>
      </q-expansion-item>
      <q-expansion-item expand-separator :label="t('nav.development')">
        <q-item :to="{ path: '/password/make' }">
          <q-item-section>Make Password</q-item-section>
        </q-item>
        <q-item :to="{ path: '/password/otp' }">
          <q-item-section>OTP</q-item-section>
        </q-item>
      </q-expansion-item>
      <q-item>
        <q-select v-model="state.lang" :options="langOptions" @select="handleMenuSeclect" dense borderless emit-value map-options options-dense />
      </q-item>
    </q-list>
  </div>
</template>
<script setup>
import { find } from "lodash";
import { reactive, onMounted, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
const router = useRouter();

const state = reactive({
  lang: "zh-Hans-CN",
});
const { t } = useI18n({ useScope: "global" });

const langOptions = [
  { lang: "zh-Hans-CN", label: "简体中文" },
  { lang: "en", label: "English" },
];

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
const lang = computed(() => {
  return find(langOptions, (item) => {
    return item.lang == state.lang;
  });
});
</script>
