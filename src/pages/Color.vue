<template>
  <q-page padding>
    <div class="row q-col-gutter-xs">
      <div class="col">
        <q-input outlined v-model="state.plain_text" label="RGB / HEX" />
      </div>
    </div>
    <div class="row q-col-gutter-md q-mt-md">
      <div class="col-xs-12 col-sm-3">
        {{ t("color.red") }}
        <q-slider v-model="state.rgb_red" :min="0" :max="255" label />
        {{ t("color.red_desc") }}
      </div>
      <div class="col-xs-12 col-sm-3">
        {{ t("color.green") }}
        <q-slider v-model="state.rgb_green" :min="0" :max="255" label />
        {{ t("color.green_desc") }}
      </div>
      <div class="col-xs-12 col-sm-3">
        {{ t("color.blue") }}
        <q-slider v-model="state.rgb_blue" :min="0" :max="255" label />
        {{ t("color.blue_desc") }}
      </div>
      <div class="col-xs-12 col-sm-3">
        {{ t("color.alpha") }}
        <q-slider v-model="state.rgb_alpha" :min="0" :max="100" label />
        {{ t("color.alpha_desc") }}
      </div>
    </div>
    <div class="row q-col-gutter-md p-mt-md">
      <div class="col-xs-12 col-sm-6">
        <q-input outlined v-model="getRgb" label="RGB" placeholder="RGB" readonly>
          <template v-slot:append>
            <q-btn icon="content_copy" @click="setClipboard(getRgb)" />
          </template>
        </q-input>
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-input outlined :model-value="getHex" label="HEX" placeholder="HEX" readonly>
          <template v-slot:append>
            <q-btn icon="content_copy" @click="setClipboard(getHex)" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="q-mt-md">
      <div style="height: 200px" :style="{ backgroundColor: getRgb }"></div>
    </div>
  </q-page>
</template>

<script setup>
import { reactive, watch, onMounted, computed } from "vue";
import * as clipboard from "clipboard-polyfill/text";
import { useI18n } from "vue-i18n";
import { colors, useQuasar } from "quasar";

const { rgbToHex, textToRgb } = colors;
const $q = useQuasar();

const { t } = useI18n({ useScope: "global" });

const state = reactive({
  plain_text: null,
  rgb_red: 0,
  rgb_green: 47,
  rgb_blue: 167,
  rgb_alpha: 100,
});

watch(
  () => state.plain_text,
  (val) => {
    console.log(val);
    parsePlainText(val);
  }
);

function parsePlainText(rgbStr) {
  const rgbObject = textToRgb(rgbStr);
  state.rgb_red = rgbObject.r;
  state.rgb_green = rgbObject.g;
  state.rgb_blue = rgbObject.b;
  if (undefined !== rgbObject.a) {
    state.rgb_alpha = rgbObject.a;
  }
}

const getRgb = computed(() => {
  if (100 === state.rgb_alpha) {
    return `rgb(${state.rgb_red},${state.rgb_green},${state.rgb_blue})`;
  }
  const alpha = Number(state.rgb_alpha / 100).toFixed(2);
  return `rgb(${state.rgb_red},${state.rgb_green},${state.rgb_blue},${alpha})`;
});
const getHex = computed(() => {
  if (100 === state.rgb_alpha) {
    return rgbToHex({ r: state.rgb_red, g: state.rgb_green, b: state.rgb_blue });
  }
  return rgbToHex({ r: state.rgb_red, g: state.rgb_green, b: state.rgb_blue, a: state.rgb_alpha });
});

function setClipboard(e) {
  clipboard.writeText(e);
  $q.notify({
    message: "复制成功",
    color: "green",
  });
}
</script>
