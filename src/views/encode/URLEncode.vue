<template>
  <div>
    <div class="form-floating">
      <textarea class="form-control" style="height: 100px" v-model="state.plain" placeholder="原始 URI"></textarea>
      <label>原始 URL</label>
    </div>
    <div class="border rounded mt-2">
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-outline-primary" v-on:click="encode"><i class="bi bi-arrow-down"></i> 编码</button>
        <button type="button" class="btn btn-outline-primary" v-on:click="decode"><i class="bi bi-arrow-up"></i>还原</button>
      </div>
    </div>
    <div class="form-floating mt-2">
      <textarea class="form-control" style="height: 100px" v-model="state.encodeURI" placeholder="encodeURI"></textarea>
      <label>encodeURI</label>
    </div>
    <div class="form-floating mt-1">
      <textarea class="form-control" style="height: 100px" v-model="state.encodeURIComponent" placeholder="encodeURIComponent"></textarea>
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
