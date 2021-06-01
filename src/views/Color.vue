<template>
  <el-row :gutter="5">
    <el-col :span="12">
      <el-input v-model="state.plain_rgb" placeholder="RGB" />
    </el-col>
    <el-col :span="12">
      <el-input v-model="state.plain_hex" placeholder="HEX" />
    </el-col>
  </el-row>
  <el-row :gutter="2">
    <el-col :span="6">
      {{ t("color.red") }}
      <el-slider v-model="state.rgb_red" :min="0" :max="255" />
      {{ t("color.red_desc") }}
    </el-col>
    <el-col :span="6">
      {{ t("color.green") }}
      <el-slider v-model="state.rgb_green" :min="0" :max="255" />
      {{ t("color.green_desc") }}
    </el-col>
    <el-col :span="6">
      {{ t("color.blue") }}
      <el-slider v-model="state.rgb_blue" :min="0" :max="255" />
      {{ t("color.blue_desc") }}
    </el-col>
    <el-col :span="6">
      {{ t("color.alpha") }}
      <el-slider v-model="state.rgb_alpha" :min="0" :max="255" />
      {{ t("color.alpha_desc") }}
    </el-col>
  </el-row>
  <el-row :gutter="2">
    <el-col :span="6">
      <label>RGB</label>
      <el-input v-bind:value="getRgb()" placeholder="RGB" disabled />
    </el-col>
    <el-col :span="6">
      <label>RGBA</label>
      <el-input v-bind:value="getRgba()" placeholder="RGBA" disabled />
    </el-col>
    <el-col :span="6">
      <label>HEX</label>
      <el-input v-bind:value="getHex()" placeholder="HEX" disabled />
    </el-col>
    <el-col :span="6">
      <label>HEX With Alpha</label>
      <el-input v-bind:value="getHexWithAlpha()" placeholder="HEX With Alpha" disabled />
    </el-col>
  </el-row>
  <div class="mt-5">
    <div style="height: 200px" :style="{ backgroundColor: getRgba() }"></div>
  </div>
</template>

<script setup>
import { reactive, watch, onMounted } from "vue";
import * as clipboard from "clipboard-polyfill/text";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const state = reactive({
  plain_rgb: null,
  plain_rgba: null,
  plain_hex: null,
  rgb_red: 0,
  rgb_green: 0,
  rgb_blue: 0,
  rgb_alpha: 255,
});

onMounted(() => {});
/**
 *
 **/
watch(
  () => state.plain_rgb,
  (val) => {
    parseRgb(val);
  }
);
watch(
  () => state.plain_hex,
  (val) => {
    parseHex(val);
  }
);

function parseRgb(rgbStr) {
  const rgbArr = rgbStr.match(/(\d+\.\d+)|(\d+)/g);
  if (null != rgbArr && rgbArr.length > 0) {
    state.rgb_red = rgbArr[0];
  }
  if (null != rgbArr && rgbArr.length > 1) {
    state.rgb_green = rgbArr[1];
  }
  if (null != rgbArr && rgbArr.length > 2) {
    state.rgb_blue = rgbArr[2];
  }
  if (null != rgbArr && rgbArr.length > 3) {
    state.rgb_alpha = parseInt(rgbArr[3] * 255);
  }
}
function parseHex(hexStr) {
  const hexArr = hexStr.match(/[\d\w]{2}/g);
  if (null != hexArr && hexArr.length > 0) {
    state.rgb_red = rgb(hexArr[0]);
  }
  if (null != hexArr && hexArr.length > 1) {
    state.rgb_green = rgb(hexArr[1]);
  }
  if (null != hexArr && hexArr.length > 2) {
    state.rgb_blue = rgb(hexArr[2]);
  }
  if (null != hexArr && hexArr.length > 3) {
    state.rgb_alpha = rgb(hexArr[3]);
  }
}
function getRgb() {
  const rgbStr = "rgb(" + state.rgb_red + ", " + state.rgb_green + ", " + state.rgb_blue + ")";
  return rgbStr;
}
function getRgba() {
  let alpha = Number(state.rgb_alpha / 255).toFixed(2);
  alpha = ".00" === alpha.slice(-3) ? parseInt(alpha) : alpha;
  const rgbaStr = "rgba(" + state.rgb_red + ", " + state.rgb_green + ", " + state.rgb_blue + ", " + alpha + ")";
  return rgbaStr;
}
function getHex() {
  return "#" + hex(state.rgb_red) + hex(state.rgb_green) + hex(state.rgb_blue);
}
function getHexWithAlpha() {
  return "#" + hex(state.rgb_red) + hex(state.rgb_green) + hex(state.rgb_blue) + hex(state.rgb_alpha);
}
function setClipboard(e) {
  clipboard.writeText(e.target.value);
}
function hex(val) {
  return ("0" + parseInt(val).toString(16)).slice(-2);
}
function rgb(val) {
  return parseInt(val, 16);
}
function empty(val) {
  if ("undefined" === typeof val || null == val || "" === val) {
    return true;
  }
  return false;
}
</script>