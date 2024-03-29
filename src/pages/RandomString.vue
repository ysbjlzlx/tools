<template>
  <q-page padding>
    <div>
      <div class="form-floating">
        <q-input outlined type="text" v-model="state.password" :label="t('common.text')" counter :maxlength="256" />
      </div>
      <q-btn-group class="q-mt-md">
        <q-btn color="primary" v-on:click="copy()">{{ t("common.copy") }}</q-btn>
        <q-btn color="primary" v-on:click="refresh()">{{ t("common.refresh") }}</q-btn>
      </q-btn-group>
    </div>
    <h3>{{ t("common.option") }}</h3>
    <div class="q-mt-md">
      <q-checkbox v-model="option.number">{{ t("password.numeric") }} 0 ~ 9</q-checkbox>
      <q-checkbox v-model="option.lowerCaseChar">{{ t("password.lowercase") }} a ~ z</q-checkbox>
      <q-checkbox v-model="option.upperCaseChar">{{ t("password.captial") }} A ~ Z</q-checkbox>
      <q-checkbox v-model="option.symbolChar">{{ t("password.symbol") }}</q-checkbox>
      <q-input outlined type="text" class="form-control" v-model="state.symbolChar" :readonly="!option.symbolChar" />
    </div>
    <div class="q-mt-md">
      <label>{{ t("common.length") }}</label>
      <q-slider v-model="state.length" :min="6" :max="128" markers label label-always />
    </div>
  </q-page>
</template>
<script setup>
import { onMounted, reactive, watch } from "vue";
import * as clipboard from "clipboard-polyfill/text";
import { useI18n } from "vue-i18n";
import { getRandomInt } from "../scripts/helper/util";
import { useQuasar } from "quasar";

const { t } = useI18n({ useScope: "global" });
const $q = useQuasar();

// prettier-ignore
const numberChar = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// prettier-ignore
const lowerCaseChar = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// prettier-ignore
const upperCaseChar = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
// prettier-ignore
const symbolChar = ["!", "@", "#", "$", "%", "^", "&", "*"];

const state = reactive({
  symbolChar: symbolChar.join(""),
  length: 16,
  password: "",
  marks: {
    6: "6",
    8: "8",
    16: "16",
    64: "64",
    128: "128",
  },
});
const option = reactive({
  number: true,
  lowerCaseChar: true,
  upperCaseChar: true,
  symbolChar: true,
});
onMounted(() => {
  refresh();
});

function make() {
  let haystack = [];
  if (option.number) {
    haystack = haystack.concat(numberChar);
  }
  if (option.lowerCaseChar) {
    haystack = haystack.concat(lowerCaseChar);
  }
  if (option.upperCaseChar) {
    haystack = haystack.concat(upperCaseChar);
  }
  if (option.symbolChar) {
    haystack = haystack.concat(state.symbolChar.split(""));
  }
  const tmp = [];
  for (let i = 0; i < state.length; i++) {
    const index = getRandomInt(0, haystack.length);
    tmp.push(haystack[index]);
  }
  return tmp;
}

function copy() {
  clipboard.writeText(state.password);
  $q.notify({
    message: "复制成功",
    color: "green",
  });
}

function refresh() {
  state.password = make().join("");
}

watch(
  [() => option, () => state.length, () => state.symbolChar],
  () => {
    refresh();
  },
  { deep: true }
);
</script>
