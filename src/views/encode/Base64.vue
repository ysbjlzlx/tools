<template>
  <div>
    <label>{{ t("common.text_plain") }}</label>
    <el-input type="textarea" :rows="5" v-model="state.plain" :placeholder="t('common.text_plain')" />
  </div>
  <div class="mt-5">
    <el-button type="primary" v-on:click="base64Encode" icon="el-icon-bottom">{{ t("common.encode") }}</el-button>
    <el-button type="primary" v-on:click="base64Decode" icon="el-icon-top">{{ t("common.decode") }}</el-button>
  </div>
  <div class="mt-5">
    <label>{{ t("common.text_base64") }}</label>
    <el-input type="textarea" :rows="5" v-model="state.encoded" :placeholder="t('common.text_base64')" />
  </div>
</template>
<script setup>
import { reactive } from "vue";
import { enc } from "crypto-js";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const state = reactive({
  plain: "",
  encoded: "",
});
function base64Encode() {
  if (state.plain && "" !== state.plain) {
    state.encoded = enc.Base64.stringify(enc.Utf8.parse(state.plain));
  }
}
function base64Decode() {
  if (state.encoded && "" !== state.encoded) {
    state.plain = enc.Utf8.stringify(enc.Base64.parse(state.encoded));
  }
}
</script>
