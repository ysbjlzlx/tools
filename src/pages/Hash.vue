<template>
  <q-page padding>
    <div>
      <label>{{ t("common.text_plain") }}</label>
      <q-input outlined v-model="state.plain" :placeholder="t('common.text_plain')" />
    </div>
    <div>
      <q-input outlined class="q-mt-xs" v-model="md5" label="MD5" readonly />
      <q-input outlined class="q-mt-xs" v-model="sha1" label="SHA1" readonly />
      <q-input outlined class="q-mt-xs" v-model="sha256" label="SHA256" readonly />
      <q-input outlined class="q-mt-xs" v-model="sha512" label="SHA512" readonly />
    </div>
  </q-page>
</template>

<script setup>
import { reactive, computed } from "vue";
import { MD5, SHA1, SHA256, SHA512 } from "crypto-js";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const state = reactive({ plain: null });

const md5 = computed(() => {
  return empty(state.plain) ? "" : MD5(state.plain);
});
const sha1 = computed(() => {
  return empty(state.plain) ? "" : SHA1(state.plain);
});

const sha256 = computed(() => {
  return empty(state.plain) ? "" : SHA256(state.plain);
});
const sha512 = computed(() => {
  return empty(state.plain) ? "" : SHA512(state.plain);
});

function empty(val) {
  if ("undefined" === typeof val || null == val || "" === val) {
    return true;
  }
  return false;
}
</script>
