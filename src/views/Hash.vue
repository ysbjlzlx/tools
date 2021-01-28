<template>
  <div>
    <div class="form-floating">
      <input class="form-control" type="text" v-model="state.plain" :placeholder="t('common.text_plain')" />
      <label>{{ t("common.text_plain") }}</label>
    </div>
    <div class="mt-2 form-floating">
      <input class="form-control" type="text" :value="getMd5()" disabled placeholder="MD5" />
      <label>MD5</label>
    </div>
    <div class="mt-2 form-floating">
      <input class="form-control" type="text" :value="getSha1()" disabled placeholder="SHA1" />
      <label>SHA1</label>
    </div>
    <div class="mt-2 form-floating">
      <input class="form-control" type="text" :value="getSha256()" disabled placeholder="SHA256" />
      <label>SHA256</label>
    </div>
    <div class="mt-2 form-floating">
      <input class="form-control" type="text" :value="getSha512()" disabled placeholder="SHA512" />
      <label>SHA512</label>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { MD5, SHA1, SHA256, SHA512 } from "crypto-js";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const state = reactive({ plain: null });

function getMd5() {
  return empty(state.plain) ? "" : MD5(state.plain);
}
function getSha1() {
  return empty(state.plain) ? "" : SHA1(state.plain);
}
function getSha256() {
  return empty(state.plain) ? "" : SHA256(state.plain);
}
function getSha512() {
  return empty(state.plain) ? "" : SHA512(state.plain);
}
function empty(val) {
  if ("undefined" === typeof val || null == val || "" === val) {
    return true;
  }
  return false;
}
</script>
