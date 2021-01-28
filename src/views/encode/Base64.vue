<template>
  <div class="mt-1">
    <div class="form-floating">
      <textarea class="form-control" style="height: 100px" v-model="state.plain" :placeholder="t('base64.plain_text')"></textarea>
      <label>{{ t("base64.plain_text") }}</label>
    </div>
    <div class="border rounded mt-2">
      <div class="btn-group">
        <button type="button" class="btn btn-outline-primary" v-on:click="base64Encode"><i class="bi bi-arrow-down" aria-hidden="true"></i> {{ t("common.encode") }} </button>
        <button type="button" class="btn btn-outline-primary" v-on:click="base64Decode"><i class="bi bi-arrow-up" aria-hidden="true"></i> {{ t("common.decode") }}</button>
      </div>
    </div>
    <div class="form-floating mt-2">
      <textarea class="form-control" style="height: 100px" v-model="state.encoded" :placeholder="t('base64.base64_text')"></textarea>
      <label>{{ t("base64.base64_text") }}</label>
    </div>
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
