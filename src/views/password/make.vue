<template>
  <div>
    <h2>password</h2>
    <div class="form-floating">
      <textarea class="form-control" style="height: 100px" v-model="state.password" placeholder="password"></textarea>
      <label>password</label>
    </div>
    <el-button-group class="mt-1">
      <el-button type="primary" v-on:click="copy()">copy</el-button>
      <el-button type="info" v-on:click="refresh()">refresh</el-button>
    </el-button-group>
  </div>
  <div>
    <h2>options</h2>
    <div class="form-floating">
      <input type="text" class="form-control" v-model="state.numberChar" />
      <label>number chars</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" v-model="state.lowerCaseChar" />
      <label>lower case chars</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" v-model="state.upperCaseChar" />
      <label>upper case chars</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" v-model="state.symbolChar" />
      <label>symbol chars</label>
    </div>
  </div>
  <el-slider v-model="state.length" :min="8" :max="128"></el-slider>
</template>
<script setup>
import { onMounted, reactive } from "vue";
import { ElSlider, ElButtonGroup, ElButton, ElMessage } from "element-plus";
import * as clipboard from "clipboard-polyfill/text";
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
const symbolChar = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "="];

const state = reactive({
  numberChar: numberChar.join(""),
  lowerCaseChar: lowerCaseChar.join(""),
  upperCaseChar: upperCaseChar.join(""),
  symbolChar: symbolChar.join(""),
  length: 8,
  password: "",
});
onMounted(() => {
  refresh();
});
function make() {
  const haystack = [].concat(state.numberChar.split(""), state.lowerCaseChar.split(""), state.upperCaseChar.split(""), state.symbolChar.split(""));
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
