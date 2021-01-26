<template>
  <div>
    <div class="form-floating">
      <input class="form-control" type="text" v-model="state.plain" placeholder="原始值" />
      <label>原始值</label>
    </div>
    <div class="mt-2 form-floating">
      <input class="form-control" type="text" :value="getMd5()" disabled placeholder="MD5 结果" />
      <label>MD5 结果</label>
    </div>
    <div class="mt-2 form-floating">
      <input class="form-control" type="text" :value="getSha1()" disabled placeholder="SHA1 结果" />
      <label>SHA1 结果</label>
    </div>
    <div class="mt-2 form-floating">
      <input class="form-control" type="text" :value="getSha256()" disabled placeholder="SHA256 结果" />
      <label>SHA256 结果</label>
    </div>
    <div class="mt-2 form-floating">
      <input class="form-control" type="text" :value="getSha512()" disabled placeholder="SHA512 结果" />
      <label>SHA512 结果</label>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { MD5, SHA1, SHA256, SHA512 } from "crypto-js";

const state = reactive({ plain: null });

function getMd5() {
  return empty(state.plain) ? "" : MD5(state.plain);
}
function getSha1() {
  return empty(state.plain) ? "" : SHA1(state.plain);
}
function getSha256() {
  return empty(state.plain) ? "" : SHA256(state.plain);
}
function getSha512() {
  return empty(state.plain) ? "" : SHA512(state.plain);
}
function empty(val) {
  if ("undefined" === typeof val || null == val || "" === val) {
    return true;
  }
  return false;
}
</script>
