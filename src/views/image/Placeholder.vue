<template>
  <div class="mt-1">
    <div class="row">
      <div class="col form-floating">
        <input type="number" class="form-control" v-model="state.weight" placeholder="宽" />
        <label>宽</label>
      </div>
      <div class="col form-floating">
        <input type="number" class="form-control" v-model="state.height" placeholder="高" />
        <label>高</label>
      </div>
    </div>
    <div class="row mt-1">
      <div class="form-floating">
        <textarea class="form-control" v-model="state.text" placeholder="文字"></textarea>
        <label>文字</label>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label class="form-label">背景色</label>
        <input type="color" class="form-control form-control-color" v-model="state.bgColor" />
      </div>
      <div class="col">
        <label class="form-label">文字颜色</label>
        <input type="color" class="form-control form-control-color" v-model="state.textColor" />
      </div>
    </div>

    <div class="border rounded mt-5">
      <img class="mx-auto d-block" v-bind:src="generateUrl()" v-bind:style="{ wieght: state.weight }" title="占位图" />
    </div>
    <div class="border rounded mt-2 p-2">
      <span v-text="generateUrl()" v-on:click="onClickUrl()"></span>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import * as clipboard from "clipboard-polyfill/text";

const state = reactive({
  weight: 150,
  height: null,
  text: null,
  extension: null,
  bgColor: "#cccccc",
  textColor: "#969696",
});
function generateUrl() {
  let host = "https://via.placeholder.com";
  host = host + "/" + state.weight;
  if (state.height && "" !== state.height) {
    host = host + "x" + state.height;
  }
  host = host + "/" + state.bgColor.substring(1);
  host = host + "/" + state.textColor.substring(1);
  if (state.text && "string" === typeof state.text && "" !== state.text) {
    host = host + "?text=" + encodeURIComponent(state.text);
  }
  return host;
}
function onClickUrl() {
  clipboard.writeText(generateUrl());
}
</script>