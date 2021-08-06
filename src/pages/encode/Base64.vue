<template>
  <div>
    <label>{{ t("common.text_plain") }}</label>
    <q-input outlined type="textarea" :rows="5" v-model="state.plain" :placeholder="t('common.text_plain')" />
  </div>
  <div class="q-mt-md">
    <q-btn-group>
      <q-btn color="primary" v-on:click="base64Encode" icon="arrow_downward">{{ t("common.encode") }}</q-btn>
      <q-btn color="primary" v-on:click="base64Decode" icon="arrow_upward">{{ t("common.decode") }}</q-btn>
    </q-btn-group>
  </div>
  <div class="q-mt-md">
    <label>{{ t("common.text_base64") }}</label>
    <q-input outlined type="textarea" :rows="5" v-model="state.encoded" :placeholder="t('common.text_base64')" />
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
