<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-6 mt-0 mt-md-0 form-floating">
        <input type="text" class="form-control" id="plain_rgb" v-model="state.plain_rgb" placeholder="RGB" />
        <label for="plain_rgb">RGB</label>
      </div>
      <div class="col-12 col-md-6 mt-1 mt-md-0 form-floating">
        <input type="text" class="form-control" id="plain_hex" v-model="state.plain_hex" placeholder="HEX" />
        <label for="plain_hex">HEX</label>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12 col-md-3 mt-0 mt-md-0">
        <label class="form-label" for="rgb_red">{{ t("color.red") }}</label>
        <input type="range" class="form-range" min="0" max="255" v-model="state.rgb_red" />
        <input type="number" class="form-control" id="rgb_red" v-model="state.rgb_red" min="0" max="255" />
        <div class="form-text">{{ t("color.red_desc") }}</div>
      </div>
      <div class="col-12 col-md-3 mt-1 mt-md-0">
        <label class="form-label" for="rgb_green">{{ t("color.green") }}</label>
        <input type="range" class="form-range" min="0" max="255" v-model="state.rgb_green" />
        <input type="number" class="form-control" id="rgb_green" v-model="state.rgb_green" min="0" max="255" />
        <div class="form-text">{{ t("color.green_desc") }}</div>
      </div>
      <div class="col-12 col-md-3 mt-1 mt-md-0">
        <label class="form-label" for="rgb_blue">{{ t("color.blue") }}</label>
        <input type="range" class="form-range" min="0" max="255" v-model="state.rgb_blue" />
        <input type="number" class="form-control" id="rgb_blue" v-model="state.rgb_blue" min="0" max="255" />
        <div class="form-text">{{ t("color.blue_desc") }}</div>
      </div>
      <div class="col-12 col-md-3 mt-1 mt-md-0">
        <label class="form-label" for="rgb_alpha">{{ t("color.alpha") }}</label>
        <input type="range" class="form-range" min="0" max="255" v-model="state.rgb_alpha" />
        <input type="number" class="form-control" id="rgb_alpha" v-model="state.rgb_alpha" min="0" max="255" />
        <div class="form-text">{{ t("color.alpha_desc") }}</div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12 col-md-3 mt-0 mt-md-0 form-floating" v-on:click="setClipboard($event)" title="点击复制">
        <input type="text" class="form-control" v-bind:value="getRgb()" placeholder="RGB" disabled />
        <label>RGB</label>
      </div>
      <div class="col-12 col-md-3 mt-1 mt-md-0 form-floating" v-on:click="setClipboard($event)">
        <input type="text" class="form-control" v-bind:value="getRgba()" placeholder="RGBA" disabled />
        <label>RGBA</label>
      </div>
      <div class="col-12 col-md-3 mt-1 mt-md-0 form-floating" v-on:click="setClipboard($event)">
        <input type="text" id="rgb_hex" class="form-control" v-bind:value="getHex()" placeholder="HEX" disabled />
        <label>HEX</label>
      </div>
      <div class="col-12 col-md-3 mt-1 mt-md-0 form-floating" v-on:click="setClipboard($event)">
        <input type="text" id="rgb_rgba" class="form-control" v-bind:value="getHexWithAlpha()" placeholder="HEX With Alpha" disabled />
        <label>HEX With Alpha</label>
      </div>
    </div>
    <div class="mt-5">
      <div style="height: 200px" :style="{ backgroundColor: getRgba() }"></div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";
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