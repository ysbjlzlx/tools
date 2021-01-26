<template>
  <div class="mt-1">
    <div class="form-floating">
      <textarea class="form-control" style="height: 100px" v-model="state.plain" placeholder="原始文本"></textarea>
      <label>原始文本</label>
    </div>
    <div class="border rounded mt-2">
      <div class="btn-group">
        <button type="button" class="btn btn-outline-primary" v-on:click="base64Encode">编码 <i class="bi bi-arrow-down" aria-hidden="true"></i></button>
        <button type="button" class="btn btn-outline-primary" v-on:click="base64Decode"><i class="bi bi-arrow-up" aria-hidden="true"></i> 解码</button>
      </div>
    </div>
    <div class="form-floating mt-2">
      <textarea class="form-control" style="height: 100px" v-model="state.encoded" placeholder="Base64 文本"></textarea>
      <label>Base64 文本</label>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import { enc } from "crypto-js";

const state = reactive({
  plain: "",
  encoded: "",
});
function base64Encode() {
  state.encoded = empty(state.plain) ? "" : enc.Base64.stringify(enc.Utf8.parse(state.plain));
}
function base64Decode() {
  state.plain = empty(state.encoded) ? "" : enc.Utf8.stringify(enc.Base64.parse(state.encoded));
}
function empty(val) {
  if ("undefined" === typeof val || null == val || "" === val) {
    return true;
  }
  return false;
}
</script>
