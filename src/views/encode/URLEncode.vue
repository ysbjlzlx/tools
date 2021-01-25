<template>
  <div>
    <div class="form-floating">
      <input type="text" class="form-control" v-model="state.plain" placeholder="原始 URL" />
      <label>原始 URL</label>
    </div>

    <div class="border rounded mt-5 p-1" style="height: 128px" v-text="state.urlEncode"></div>
  </div>
</template>
<script setup>
import { reactive, watch } from "vue";

const state = reactive({
  plain: "",
  urlEncode: "",
});
watch(
  () => state.plain,
  (val) => {
    state.urlEncode = encodeURIComponent(val);
  }
);
</script>