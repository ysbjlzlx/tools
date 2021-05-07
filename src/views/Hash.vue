<template>
  <div>
    <label>{{ t("common.text_plain") }}</label>
    <el-input v-model="state.plain" :placeholder="t('common.text_plain')" />
  </div>
  <el-form label-position="right" label-width="60px" style="margin-top: 15px">
    <el-form-item label="MD5">
      <el-input :value="getMd5()" placeholder="MD5" disabled />
    </el-form-item>
    <el-form-item label="SHA1">
      <el-input :value="getSha1()" disabled placeholder="SHA1" />
    </el-form-item>
    <el-form-item label="SHA256">
      <el-input :value="getSha256()" disabled placeholder="SHA256" />
    </el-form-item>
    <el-form-item label="SHA512">
      <el-input :value="getSha512()" disabled placeholder="SHA512" />
    </el-form-item>
  </el-form>
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
