<template></template>
<script setup>
import { random } from "lodash";
import { reactive } from "vue";
import util from "../scripts/helper/util";
const state = reactive({
  type: null,
  issuer: null,
  account: null,
  secret: null,
  algorithm: null,
  digits: null,
  counter: null,
  period: null,
});
const typeOptions = [
  { value: "totp", lable: "TOTP" },
  { value: "hotp", lable: "HOTP" },
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
    random = util.getRandomInt(0, randomOptions.length);
    secret.push(randomOptions[random]);
  }
  return secret.join("");
};
</script>