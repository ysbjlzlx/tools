<template>
  <div>
    <div class="form-floating">
      <input type="text" class="form-control" v-model="this.state.numberChar" />
      <label>number chars</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" v-model="this.state.lowerCaseChar" />
      <label>lower case chars</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" v-model="this.state.upperCaseChar" />
      <label>upper case chars</label>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" v-model="this.state.symbolChar" />
      <label>symbol chars</label>
    </div>
  </div>
  <el-slider v-model="state.length"></el-slider>
  <div class="form-floating">
    <textarea rows="16" class="form-control" v-bind:value="make().join('')" />
  </div>
</template>
<script setup>
import { onMounted, reactive } from "vue";
import { ElSlider } from "element-plus";
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
  const pwd = make();
  console.log(pwd.join(""));
});
function make() {
  const haystack = [].concat(state.numberChar.split(""), state.lowerCaseChar.split(""), state.upperCaseChar.split(""), state.symbolChar.split(""));
  const tmp = [];
  for (let i = 0; i < state.length; i++) {
    const index = getRandomIntInclusive(0, haystack.length);
    tmp.push(haystack[index]);
    console.log(haystack[index]);
  }
  return tmp;
}
// 同时包含最小值和最大值的随机数
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}
</script>
