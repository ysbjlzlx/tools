<template>
  <q-page padding>
    <div>
      <q-input outlined type="textarea" :rows="5" v-model="state.plain" label="URL" />
    </div>
    <div class="q-mt-md">
      <q-btn-group>
        <q-btn color="primary" v-on:click="encode" icon="arrow_downward">{{ t("common.encode") }}</q-btn>
        <q-btn color="primary" v-on:click="decode" icon="arrow_upward">{{ t("common.decode") }}</q-btn>
      </q-btn-group>
    </div>

    <div class="q-mt-md">
      <q-input outlined type="textarea" :rows="5" v-model="state.encodeURI" label="encodeURI" />
      <q-input outlined type="textarea" :rows="5" v-model="state.encodeURIComponent" label="encodeURIComponent" class="q-mt-md" />
    </div>
  </q-page>
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
