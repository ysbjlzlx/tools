<template>
  <div class="row mt-5">
    <div class="col-5">
      <label class="form-label">原始文本</label>
      <textarea class="form-control" rows="16" v-model="state.plain" placeholder="原始文本"></textarea>
    </div>
    <div class="col-2">
      <div>
        <button type="button" class="btn btn-primary" v-on:click="base64Encode">编码 <i class="bi bi-arrow-right" aria-hidden="true"></i></button>
      </div>
      <div class="mt-1">
        <button type="button" class="btn btn-primary" v-on:click="base64Decode"><i class="bi bi-arrow-left" aria-hidden="true"></i> 解码</button>
      </div>
    </div>
    <div class="col-5">
      <label class="form-label">Base64 文本</label>
      <textarea class="form-control" rows="16" v-model="state.encoded"></textarea>
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
