<template>
  <el-row :gutter="5">
    <el-col :span="8">
      <label>{{ t("common.weight") }}</label>
      <br />
      <el-input type="number" v-model="state.weight" :placeholder="t('common.weight')" />
    </el-col>
    <el-col :span="8">
      <label>{{ t("common.height") }}</label>
      <br />
      <el-input type="number" v-model="state.height" :placeholder="t('common.height')" />
    </el-col>
    <el-col :span="8">
      <label>{{ t("common.text") }}</label>
      <br />
      <el-input v-model="state.text" :placeholder="t('common.text')" />
    </el-col>
  </el-row>
  <el-row :gutter="5">
    <el-col :span="12">
      <label>{{ t("placeholder.bg_color") }}</label>
      <br />
      <el-color-picker v-model="state.bgColor" />
    </el-col>
    <el-col :span="12">
      <label>{{ t("placeholder.text_color") }}</label>
      <br />
      <el-color-picker v-model="state.textColor" />
    </el-col>
  </el-row>
  <div class="mt-1">
    <div class="border rounded mt-5">
      <img class="mx-auto d-block" v-bind:src="generateUrl()" v-bind:style="{ wieght: state.weight }" :title="t('placeholder.placeholder_img')" />
    </div>
    <div class="border rounded mt-2 p-2">
      <span v-text="generateUrl()" v-on:click="onClickUrl()"></span>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import * as clipboard from "clipboard-polyfill/text";
import { useI18n } from "vue-i18n";
import { ElRow, ElCol, ElInput, ElForm, ElFormItem, ElInputNumber, ElColorPicker } from "element-plus";

const { t } = useI18n({ useScope: "global" });

const state = reactive({
  weight: 150,
  height: null,
  text: null,
  extension: null,
  bgColor: "#cccccc",
  textColor: "#969696",
});
function generateUrl() {
  let host = "https://via.placeholder.com";
  host = host + "/" + state.weight;
  if (state.height && "" !== state.height) {
    host = host + "x" + state.height;
  }
  host = host + "/" + state.bgColor.substring(1);
  host = host + "/" + state.textColor.substring(1);
  if (state.text && "string" === typeof state.text && "" !== state.text) {
    host = host + "?text=" + encodeURIComponent(state.text);
  }
  return host;
}
function onClickUrl() {
  clipboard.writeText(generateUrl());
}
</script>