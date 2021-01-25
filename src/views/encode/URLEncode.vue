<template>
  <div>
    <div class="form-floating">
      <input type="text" class="form-control" v-model="state.plain" placeholder="原始 URL" />
      <label>原始 URL</label>
    </div>
    <div class="border rounded mt-2">
      <button type="button" class="btn btn-primary" v-on:click="encode"><i class="bi bi-arrow-down"></i> 编码</button>
      <button type="button" class="btn btn-primary" v-on:click="decode"><i class="bi bi-arrow-up"></i>还原</button>
    </div>
    <div class="form-floating mt-2">
      <input type="text" class="form-control" v-model="state.encodeURI" placeholder="encodeURI" />
      <label>encodeURI</label>
    </div>
    <div class="form-floating mt-1">
      <input type="text" class="form-control" v-model="state.encodeURIComponent" placeholder="encodeURIComponent" />
      <label>encodeURIComponent</label>
    </div>
  </div>
</template>
<script setup>
import { reactive, watch } from "vue";

const state = reactive({
  plain: "",
  encodeURI: "",
  encodeURIComponent: "",
});
function encode() {
  state.encodeURI = encodeURI(state.plain);
  state.encodeURIComponent = encodeURIComponent(state.plain);
}
function decode() {
  if ("" !== state.encodeURI) {
    state.plain = decodeURI(state.encodeURI);
  }
  if ("" !== state.encodeURIComponent) {
    state.plain = decodeURIComponent(state.encodeURIComponent);
  }
}
</script>
