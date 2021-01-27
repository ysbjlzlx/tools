<template>
  <div>
    <div>
      <div class="form-floating">
        <input type="number" class="form-control" v-model="state.weight" placeholder="宽" />
        <label>宽</label>
      </div>
      <div class="form-floating">
        <input type="number" class="form-control" v-model="state.height" placeholder="高" />
        <label>高</label>
      </div>
    </div>
    <div class="mx-auto">
      <img :src="generateUrl()" title="占位图" />
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
const state = reactive({ weight: 15, height: null, text: null, extension: null, bgColor: null, textColor: null });
function generateUrl() {
  let host = "https://via.placeholder.com";
  host = host + "/" + state.weight;
  return host;
}
</script>