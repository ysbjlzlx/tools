<template>
  <div>
    <div class="form-floating">
      <label>{{ t("common.password") }}</label>
      <el-input type="text" v-model="state.password" placeholder="password" :show-word-limit="true" :maxlength="256" />
    </div>
    <el-button-group class="mt-1">
      <el-button type="primary" v-on:click="copy()">{{ t("common.copy") }}</el-button>
      <el-button type="info" v-on:click="refresh()">{{ t("common.refresh") }}</el-button>
    </el-button-group>
  </div>
  <div class="mt-5">
    <h2>{{ t("common.option") }}</h2>
    <el-form label-width="80" label-position="top">
      <el-form-item>
        <el-checkbox v-model="option.number">{{ t("password.numeric") }} 0 ~ 9</el-checkbox>
        <el-checkbox v-model="option.lowerCaseChar">{{ t("password.lowercase") }} a ~ z</el-checkbox>
        <el-checkbox v-model="option.upperCaseChar">{{ t("password.captial") }} A ~ Z</el-checkbox>
        <el-checkbox v-model="option.symbolChar">{{ t("password.symbol") }}</el-checkbox>
        <el-input type="text" class="form-control" v-model="state.symbolChar" :disabled="!option.symbolChar" />
      </el-form-item>
      <el-form-item :label="t('common.length')">
        <el-slider v-model="state.length" :min="6" :max="128" :marks="state.marks" show-input></el-slider>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { onMounted, reactive, watch } from "vue";
import ElMessage from "element-plus/es/el-message";
import * as clipboard from "clipboard-polyfill/text";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });

const numberChar = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const lowerCaseChar = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const upperCaseChar = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
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
  ElMessage.success({
    showClose: true,
    message: "复制成功",
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

/**
 * 生成整数随机数
 * 不含最大值，含最小值的随机数
 * @param min 最小值（包含）
 * @param max 最大值（不包含）
 * @return {number}
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * 生成整数随机数
 * 同时包含最小值和最大值的随机数
 * @param min 最小值（包含）
 * @param max 最大值（包含）
 * @return {number}
 */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
</script>
