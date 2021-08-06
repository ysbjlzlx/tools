<template>
  <div class="row q-col-gutter-xs">
    <div class="col">
      <q-input v-model="state.plain_rgb" label="RGB" />
    </div>
    <div class="col">
      <q-input v-model="state.plain_hex" label="HEX" />
    </div>
  </div>
  <div class="row q-col-gutter-xs">
    <div class="col">
      {{ t("color.red") }}
      <q-slider v-model="state.rgb_red" :min="0" :max="255" label label-always />
      {{ t("color.red_desc") }}
    </div>
    <div class="col">
      {{ t("color.green") }}
      <q-slider v-model="state.rgb_green" :min="0" :max="255" label label-always />
      {{ t("color.green_desc") }}
    </div>
    <div class="col">
      {{ t("color.blue") }}
      <q-slider v-model="state.rgb_blue" :min="0" :max="255" label label-always />
      {{ t("color.blue_desc") }}
    </div>
    <div class="col">
      {{ t("color.alpha") }}
      <q-slider v-model="state.rgb_alpha" :min="0" :max="255" label label-always />
      {{ t("color.alpha_desc") }}
    </div>
  </div>
  <div class="row q-col-gutter-xs">
    <div class="col">
      <q-input v-model="getRgb" label="RGB" placeholder="RGB" readonly />
    </div>
    <div class="col">
      <q-input v-model="getRgba" label="RGBA" placeholder="RGBA" readonly />
    </div>
    <div class="col">
      <q-input v-model="getHex" label="HEX" placeholder="HEX" readonly />
    </div>
    <div class="col">
      <q-input v-model="getHexWithAlpha" label="HEX With Alpha" readonly />
    </div>
  </div>
  <div class="mt-5">
    <div style="height: 200px" :style="{ backgroundColor: getRgbaa() }"></div>
  </div>
</template>

<script setup>
import { reactive, watch, onMounted, computed } from "vue";
import * as clipboard from "clipboard-polyfill/text";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const state = reactive({
  plain_rgb: null,
  plain_rgba: null,
  plain_hex: null,
  rgb_red: 0,
  rgb_green: 47,
  rgb_blue: 167,
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

function getRgbaa() {
  let alpha = Number(state.rgb_alpha / 255).toFixed(2);
  alpha = ".00" === alpha.slice(-3) ? parseInt(alpha) : alpha;
  const rgbaStr = "rgba(" + state.rgb_red + ", " + state.rgb_green + ", " + state.rgb_blue + ", " + alpha + ")";
  return rgbaStr;
}

const getRgb = computed(() => {
  const rgbStr = "rgb(" + state.rgb_red + ", " + state.rgb_green + ", " + state.rgb_blue + ")";
  return rgbStr;
});
const getRgba = computed(() => {
  let alpha = Number(state.rgb_alpha / 255).toFixed(2);
  alpha = ".00" === alpha.slice(-3) ? parseInt(alpha) : alpha;
  const rgbaStr = "rgba(" + state.rgb_red + ", " + state.rgb_green + ", " + state.rgb_blue + ", " + alpha + ")";
  return rgbaStr;
});
const getHex = computed(() => {
  return "#" + hex(state.rgb_red) + hex(state.rgb_green) + hex(state.rgb_blue);
});
const getHexWithAlpha = computed(() => {
  return "#" + hex(state.rgb_red) + hex(state.rgb_green) + hex(state.rgb_blue) + hex(state.rgb_alpha);
});

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