<template>
  <div>
    <label>URL</label>
    <el-input type="textarea" :rows="5" v-model="state.plain" placeholder="URL" />
  </div>
  <div>
    <el-button type="primary" v-on:click="encode" icon="el-icon-bottom">{{ t("common.encode") }}</el-button>
    <el-button type="primary" v-on:click="decode" icon="el-icon-top">{{ t("common.decode") }}</el-button>
  </div>
  <div>
    <label>encodeURI</label>
    <el-input type="textarea" :rows="5" v-model="state.encodeURI" placeholder="encodeURI" />
  </div>
  <div>
    <label>encodeURIComponent</label>
    <el-input type="textarea" :rows="5" v-model="state.encodeURIComponent" placeholder="encodeURIComponent" />
  </div>
</template>
<script setup>
import { reactive, watch } from "vue";
import { useI18n } from "vue-i18n";
import { ElInput, ElButton } from "element-plus";

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
