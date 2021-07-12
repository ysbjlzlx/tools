<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="8">
        <el-input v-model="state.issuer" label="Issuer" placeholder="Issuer" />
      </el-col>
      <el-col :span="8">
        <el-input v-model="state.account" label="Account" placeholder="Account name" />
      </el-col>
      <el-col :span="8">
        <el-input v-model="state.secret" label="Secret key" placeholder="Secret key" />
      </el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="8">
        <el-select v-model="state.type">
          <el-option v-for="item in typeOptions" :key="item.value" :value="item.value" :label="item.label" />
        </el-select>
      </el-col>
      <el-col :span="8"> </el-col>
      <el-col :span="8"> </el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="24">
        <el-input v-bind:value="otpUrl" />
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { reactive, computed } from "vue";
import { getRandomInt } from "../scripts/helper/util";
const state = reactive({
  type: "totp",
  issuer: null,
  account: null,
  secret: null,
  algorithm: null,
  digits: null,
  counter: null,
  period: null,
});
const typeOptions = [
  { value: "totp", label: "TOTP" },
  { value: "hotp", label: "HOTP" },
];
const algorithmOptions = [
  { value: "SHA1", label: "SHA1" },
  { value: "SHA256", label: "SHA256" },
  { value: "SHA512", label: "SHA512" },
];
const digitsOptions = [
  { value: 6, label: "6" },
  { value: 8, label: "8" },
];
const periodOptions = [
  { value: 30, label: "30" },
  { value: 60, label: "60" },
];
// prettier-ignore
const randomOptions = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 2, 3, 4, 5, 6, 7];

const generateSecret = (randomOptions, length = 16) => {
  const secret = [];
  for (let i = 0; i < length; i++) {
    const random = getRandomInt(0, randomOptions.length);
    secret.push(randomOptions[random]);
  }
  return secret.join("");
};

const otpUrl = computed(() => {
  let url = `otpauth://${state.type}`;
  if (state.issuer && "" !== state.issuer) {
    const issuer = encodeURIComponent(state.issuer);
    url += issuer;
  }
  if (state.account && "" !== state.account) {
    const account = encodeURIComponent(state.account);
    url += `:${account}`;
  }
  const params = new URLSearchParams();
  params.append("secret", state.secret);

  url += `?${params.toString()}`;
  return url;
});
</script>