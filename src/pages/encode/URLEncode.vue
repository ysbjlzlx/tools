<template>
  <div>
    <label>URL</label>
    <q-input outlined type="textarea" :rows="5" v-model="state.plain" placeholder="URL" />
  </div>
  <div class="q-mt-md">
    <q-btn color="primary" v-on:click="encode" icon="arrow_downward" class="q-mr-xs">{{ t("common.encode") }}</q-btn>
    <q-btn color="primary" v-on:click="decode" icon="arrow_upward">{{ t("common.decode") }}</q-btn>
  </div>
  <div class="q-mt-md">
    <label>encodeURI</label>
    <q-input outlined type="textarea" :rows="5" v-model="state.encodeURI" placeholder="encodeURI" />
  </div>
  <div>
    <label>encodeURIComponent</label>
    <q-input outlined type="textarea" :rows="5" v-model="state.encodeURIComponent" placeholder="encodeURIComponent" />
  </div>
</template>
<script setup>
import { reactive, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const state = reactive({
  plain: "",
  encodeURI: "",
  encodeURIComponent: "",
});
function encode() {
  state.encodeURI = encodeURI(state.plain);
  state.encodeURIComponent = encodeURIComponent(state.plain);
}
function decode() {
  if ("" !== state.encodeURI) {
    state.plain = decodeURI(state.encodeURI);
  }
  if ("" !== state.encodeURIComponent) {
    state.plain = decodeURIComponent(state.encodeURIComponent);
  }
}
</script>
